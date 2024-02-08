from langchain_community.llms.huggingface_hub import HuggingFaceHub
from langchain_community.embeddings import HuggingFaceHubEmbeddings
from langchain_community.chat_models.huggingface import ChatHuggingFace
from langchain_community.vectorstores.pgvector import PGVector
from langchain.schema import AIMessage, HumanMessage, SystemMessage, format_document
from langchain_core.runnables import (
    RunnableBranch,
    RunnableLambda,
    RunnableParallel,
    RunnablePassthrough,
)
from langchain_core.output_parsers import StrOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder, PromptTemplate, BasePromptTemplate
from django.conf import settings
from typing import List, Tuple
from bot_core.pgvector_settings import CONNECTION_STRING
from operator import itemgetter

REPHRASE_QUESTION_TEMPLATE = """Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.
Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:"""

RESPONSE_SYSTEM_TEMPLATE = """You are a software developer interviewee. Using the provided context, answer the interviewer's question to the best of your ability. The context is related to you and your past experiences.
Generate a concise answer for a given question based on the provided context. Use an unbiased and semi-professional tone. Combine search results together into a coherent answer. Do not repeat text.
If there is nothing in the context relevant to the question at hand, or is irrelenvent to the interview, only say "Hmm, I'm not sure.". Do not try to make up an answer unless it is related to an interview. Do not mention anything about the context.
Anything between the following "context" html blocks is retrieved from a knowledge bank, and not part of the conversation with the user. You must only use information from the provided search results unless the question is related to an interview.
<context>
    {context}
<context/>

REMEMBER: If there is nothing in the context relevant to the question at hand, or is irrelenvent to the interview, only say "Hmm, I'm not sure.". Do not try to make up an answer unless it is related to an interview."""

DEFAULT_DOCUMENT_PROMPT = PromptTemplate.from_template(template="{page_content}")

class ChatHistory(BaseModel):
    chat_history: List[Tuple[str, str]] = Field(..., extra={"widget": {"type": "chat"}})
    question: str
    
class TextGeneration():   
    def __init__(self):
        llm = HuggingFaceHub(
            repo_id=settings.HUGGINGFACE_REPO_ID,
            task="text-generation",
            huggingfacehub_api_token=settings.HUGGINGFACEHUB_API_TOKEN,
            model_kwargs={
                "max_new_tokens": 512,
                "top_k": 30,
                "temperature": 0.1,
                "repetition_penalty": 1.03,
            },
        )
        self.chat_model = ChatHuggingFace(llm=llm)
        self.vectorstore = PGVector(
            embedding_function=HuggingFaceHubEmbeddings(),
            connection_string=CONNECTION_STRING,
        )
        self.retriever = self.vectorstore.as_retriever()
        self.question_chain_prompt = PromptTemplate.from_template(REPHRASE_QUESTION_TEMPLATE)
        self.response_chain_prompt = ChatPromptTemplate.from_messages([
            SystemMessage(content=RESPONSE_SYSTEM_TEMPLATE),
            MessagesPlaceholder("chat_history"),
            HumanMessage(content='{question}')
        ])
            
    def _combine_documents(self, docs, document_prompt=DEFAULT_DOCUMENT_PROMPT, document_separator="\n\n"):
        doc_strings = [format_document(doc, document_prompt) for doc in docs]
        return document_separator.join(doc_strings)
    
    def _format_chat_history(self, chat_history: List[Tuple[str, str]]) -> List:
        buffer = []
        for human, ai in chat_history:
            buffer.append(HumanMessage(content=human))
            buffer.append(AIMessage(content=ai))
        return buffer
    
    def _build_chain(self) -> BasePromptTemplate:
        _search_query = RunnableBranch(
        (
            RunnableLambda(lambda x: bool(x.get("chat_history"))).with_config(
                run_name="HasChatHistoryCheck"
            ),
            RunnablePassthrough.assign(
                chat_history=lambda x: self._format_chat_history(x["chat_history"])
            )
            | self.question_chain_prompt
            | self.chat_model
            | StrOutputParser(),
        ),
            RunnableLambda(itemgetter("question")),
        )

        _inputs = RunnableParallel(
            {
                "question": lambda x: x["question"],
                "chat_history": lambda x: self._format_chat_history(x["chat_history"]),
                "context": _search_query | self.retriever | self._combine_documents,
            }
        ).with_types(input_type=ChatHistory)

        return _inputs | self.response_chain_prompt | self.chat_model | StrOutputParser()    
            
    def generate_response(self, question: str, chat_history: List[Tuple[str,str]] = []) -> str:
        conversational_qa_chain = self._build_chain()
        response = conversational_qa_chain.invoke({'question': question, 'chat_history': chat_history})
        return response
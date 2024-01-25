from langchain_community.chat_models import ChatOllama
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores.pgvector import PGVector
from langchain.schema import AIMessage, HumanMessage, format_document
from langchain_core.runnables import (
    RunnablePassthrough,
    RunnableSerializable,
)
from langchain_core.output_parsers import StrOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder, PromptTemplate
from django.conf import settings
from typing import List, Tuple, Dict
from bot_core.pgvector_settings import CONNECTION_STRING

REPHRASE_QUESTION_TEMPLATE = """Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.
Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:"""

RESPONSE_SYSTEM_TEMPLATE = """You are a software developer interviewee. Using the provided context, answer the interviewer's question to the best of your ability. The context is related to you and your past experiences.
Generate a concise answer for a given question based solely on the provided search results. You must only use information from the provided search results. Use an unbiased and semi-professional tone. Combine search results together into a coherent answer. Do not repeat text.
If there is nothing in the context relevant to the question at hand, or is irrelenvent to the interview, only say "Hmm, I'm not sure.". Do not try to make up an answer unless it is related to an interview. Do not mention anything about the context.
Anything between the following "context" html blocks is retrieved from a knowledge bank, not part of the conversation with the user.
<context>
    {context}
<context/>

REMEMBER: If there is no relevant information within the context, just say "Hmm, I'm not sure." Do not try to make up an answer. Do not mention anything about the context. Anything between the preceding "context" html blocks is retrieved from a knowledge bank, not part of the conversation with the user."""

DEFAULT_DOCUMENT_PROMPT = PromptTemplate.from_template(template="{page_content}")

class ChatHistory(BaseModel):
    chat_history: List[Tuple[str, str]] = Field(..., extra={"widget": {"type": "chat"}})
    question: str
    
class TextGeneration():   
    def __init__(self):
        self.chat_model = ChatOllama(base_url=settings.OLLAMA_BASE_URL, model=settings.OLLAMA_MODEL)
        self.vectorstore = PGVector(
            embedding_function=OllamaEmbeddings(base_url= settings.OLLAMA_BASE_URL, model=settings.OLLAMA_MODEL),
            connection_string=CONNECTION_STRING,
        )
        self.retriever = self.vectorstore.as_retriever()
        self.question_chain_prompt = PromptTemplate.from_template(REPHRASE_QUESTION_TEMPLATE)
        self.response_chain_prompt = ChatPromptTemplate.from_messages([
            ('system', RESPONSE_SYSTEM_TEMPLATE),
            MessagesPlaceholder("chat_history"),
            ('human', '{question}')
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
    
    def _build_chain(self):
        return RunnablePassthrough.assign(
            context=self._contextualized_question | self.retriever | self._combine_documents
            ) | self.response_chain_prompt | self.chat_model
        
    def _contextualized_question(self, input: dict) -> RunnableSerializable[Dict, str] | str:
        if input.get("chat_history"):
            return self.question_chain_prompt | self.chat_model | StrOutputParser()
        else:
            return input["question"]     
            
    def generate_response(self, question: str, chat_history: List[Tuple[str,str]] = []) -> str:
        conversational_qa_chain = self._build_chain()
        chat_history = self._format_chat_history(chat_history)
        response = conversational_qa_chain.invoke({'question': question, 'chat_history': chat_history})
        return response
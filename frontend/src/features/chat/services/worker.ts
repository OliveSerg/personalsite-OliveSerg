import { Message } from "@features/chat/types/interview";
import resumeEmbeddings from "@features/chat/data/resume_embeddings.json";
import { Voy as VoyClient } from "voy-search";
import { VoyVectorStore } from "@langchain/community/vectorstores/voy";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { HuggingFaceInference } from "@langchain/community/llms/hf";
import {
	ChatPromptTemplate,
	MessagesPlaceholder,
	PromptTemplate,
} from "@langchain/core/prompts";
import { RunnableSequence, RunnablePick } from "@langchain/core/runnables";
import {
	AIMessage,
	type BaseMessage,
	HumanMessage,
} from "@langchain/core/messages";
import { Document } from "langchain/document";

const embeddings = new HuggingFaceInferenceEmbeddings({
	apiKey: import.meta.env.VITE_HUGGINGFACE_APIKEY,
});

const voyClient = new VoyClient();
const vectorstore = new VoyVectorStore(voyClient, embeddings);
const chatModel = new HuggingFaceInference({
	model: import.meta.env.VITE_HUGGINGFACE_MODEL,
	apiKey: import.meta.env.VITE_HUGGINGFACE_APIKEY,
	maxRetries: 2,
	maxConcurrency: 2,
}); // Convert to a chat aware model

const RESPONSE_SYSTEM_TEMPLATE = `You are a software developer interviewee. Using the provided context, answer the interviewer's question to the best of your ability. The context is related to you and your past experiences.
Generate a concise answer for a given question based on the provided context. Use an unbiased and semi-professional tone. Combine search results together into a coherent answer. Do not repeat text.
If there is nothing in the context relevant to the question at hand, or is irrelenvent to the interview, only say "Hmm, I'm not sure.". Do not try to make up an answer unless it is related to an interview. Do not mention anything about the context.
Anything between the following "context" html blocks is retrieved from a knowledge bank, and not part of the conversation with the user. You must only use information from the provided search results unless the question is related to an interview.
<context>
    {context}
<context/>

REMEMBER: If there is nothing in the context relevant to the question at hand, or is irrelenvent to the interview, only say "Hmm, I'm not sure.". Do not try to make up an answer unless it is related to an interview.`;

const responseChainPrompt = ChatPromptTemplate.fromMessages<{
	context: string;
	chat_history: BaseMessage[];
	question: string;
}>([
	["system", RESPONSE_SYSTEM_TEMPLATE],
	new MessagesPlaceholder("chat_history"),
	["user", `{input}`],
]);

const loadResumeEmbeddings = async () => {
	const documents: Document[] = [];
	resumeEmbeddings.label.forEach((value: string) => {
		documents.push(new Document({ pageContent: value }));
	});

	await vectorstore.addVectors(resumeEmbeddings.embedding, documents);
};
loadResumeEmbeddings();

const _formatChatHistoryAsMessages = async (chatHistory: Message[]) => {
	return chatHistory.map((chatMessage) => {
		if (chatMessage.from_user) {
			return new HumanMessage(chatMessage.message);
		} else {
			return new AIMessage(chatMessage.message);
		}
	});
};

const queryVectorStore = async (messages: Message[]) => {
	const text = messages[messages.length - 1].message;
	const chatHistory = await _formatChatHistoryAsMessages(
		messages.slice(0, -1)
	);

	const documentChain = await createStuffDocumentsChain({
		llm: chatModel,
		prompt: responseChainPrompt,
		documentPrompt: PromptTemplate.fromTemplate(
			`<doc>\n{page_content}\n</doc>`
		),
	});

	const historyAwarePrompt = ChatPromptTemplate.fromMessages([
		new MessagesPlaceholder("chat_history"),
		["user", "{input}"],
		[
			"user",
			`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.
			Chat History:
			{chat_history}
			Follow Up Input: {input}
			Standalone question:`,
		],
	]);

	const historyAwareRetrieverChain = await createHistoryAwareRetriever({
		llm: chatModel,
		retriever: vectorstore.asRetriever(),
		rephrasePrompt: historyAwarePrompt,
	});

	const retrievalChain = await createRetrievalChain({
		combineDocsChain: documentChain,
		retriever: historyAwareRetrieverChain,
	});

	const fullChain = RunnableSequence.from([
		retrievalChain,
		new RunnablePick("answer"),
	]);

	const stream = await fullChain.stream({
		input: text,
		chat_history: chatHistory,
	});

	for await (const chunk of stream) {
		if (chunk) {
			self.postMessage({
				type: "chunk",
				data: chunk,
			});
		}
	}

	self.postMessage({
		type: "complete",
		data: "OK",
	});
};

// Listen for messages from the main thread
self.addEventListener("message", async (event: any) => {
	self.postMessage({
		type: "log",
		data: `Received data!`,
	});

	try {
		await queryVectorStore(event.data.messages);
	} catch (e: any) {
		self.postMessage({
			type: "error",
			error: `${e.message}.`,
		});
		throw e;
	}

	self.postMessage({
		type: "complete",
		data: "OK",
	});
});

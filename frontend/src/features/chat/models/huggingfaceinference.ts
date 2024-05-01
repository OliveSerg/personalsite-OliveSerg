import {
	AIMessage,
	ChatMessage,
	HumanMessage,
	BaseMessage,
	MessageContent,
} from "@langchain/core/messages";
import {
	ChatGenerationChunk,
	ChatResult,
	Generation,
	LLMResult,
} from "@langchain/core/outputs";
import {
	BaseChatModel,
	BaseChatModelCallOptions,
	BaseChatModelParams,
} from "@langchain/core/language_models/chat_models";
import { CallbackManagerForLLMRun } from "@langchain/core/callbacks/manager";
import { HuggingFaceInference } from "@langchain/community/llms/hf";

export type ChatHuggingFaceOptions = BaseChatModelCallOptions;
export type ChatHuggingFaceParams = BaseChatModelParams & {
	llm: HuggingFaceInference;
	modelId?: string;
};

export class ChatHuggingFace extends BaseChatModel<ChatHuggingFaceOptions> {
	llm: HuggingFaceInference;
	modelId?: string;

	constructor(fields: ChatHuggingFaceParams) {
		super(fields);
		this.llm = fields?.llm;
		this.modelId = fields?.modelId;
	}

	async _generate(
		messages: BaseMessage[],
		options?: this["ParsedCallOptions"],
		runManager?: CallbackManagerForLLMRun
	): Promise<ChatResult> {
		const llmInput = this._toChatPrompt(messages);
		const llmResult = await this.llm.generate(
			llmInput,
			options,
			runManager
		);

		return this._toChatResult(llmResult);
	}

	_toChatPrompt(messages: BaseMessage[]): string[] {
		if (!messages.length) {
			throw new Error("at least one HumanMessage must be provided");
		}
		if (!(messages[messages.length - 1] instanceof HumanMessage)) {
			throw new Error("last message must be a HumanMessage");
		}
		const prompts = messages.map((m) => this._buildPrompt(m)).flat();

		return prompts;
	}

	_buildPrompt(message: BaseMessage): string {
		let messageText;
		if (message._getType() === "human") {
			messageText = `[INST] ${message.content} [/INST]`;
		} else if (message._getType() === "ai") {
			messageText = message.content;
		} else if (message._getType() === "system") {
			messageText = `<<SYS>> ${message.content} <</SYS>>`;
		} else if (ChatMessage.isInstance(message)) {
			messageText = `\n\n${message.role[0].toUpperCase()}${message.role.slice(
				1
			)}: ${message.content}`;
		} else {
			console.warn(
				`Unsupported message type passed: "${message._getType()}"`
			);
			messageText = "";
		}

		return String(messageText);
	}

	_toChatResult(llmResult: LLMResult): ChatResult {
		const chatGenerations = llmResult.generations.map((g: Generation) => {
			return new ChatGenerationChunk({
				message: new AIMessage({ content: g.text }),
				generationInfo: g.generationInfo,
			});
		});
		return { generations: chatGenerations, llmOutput: llmResult.llmOutput };
	}

	_llmType(): string {
		return "huggingface-chat-wrapper";
	}
}

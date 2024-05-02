import { useUser } from "@features/user-auth";
import { useEffect, useRef, useState } from "react";
import { Message } from "./types/interview";
import { fetchAIResponse } from "./services/chat-service";
import { useForm, SubmitHandler } from "react-hook-form";
import JumpingDots from "@features/loading-animations/jumping-dots";
import MessageComponent from "./message-component";

type MessageInput = {
	message: string;
	message_me: boolean;
};

type Props = {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatWindow = ({ isModalOpen = true, setIsModalOpen }: Props) => {
	const { user } = useUser();
	const [chatHistory, setChatHistory] = useState<Message[]>([]);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		reset,
	} = useForm<MessageInput>();
	const chatHistoryRef = useRef<HTMLDivElement>(null);
	const worker = useRef<Worker | null>(null);

	const onSubmit: SubmitHandler<MessageInput> = async (
		data: MessageInput
	) => {
		if (data.message_me || !user?.token || isSubmitting) {
			return;
		}
		const fallbackChatHistory = [...chatHistory];
		const newChatHistory = [
			...chatHistory,
			{
				id: crypto.randomUUID(),
				message: data.message,
				from_user: true,
			},
		];

		setChatHistory(newChatHistory);

		try {
			if (!worker.current) {
				throw new Error("Hold on things are still getting ready.");
			}
			const stream = await fetchAIResponse(
				newChatHistory,
				worker.current
			);
			const reader = stream.getReader();

			let chunk = await reader.read();

			const aiResponseMessage: Message = {
				id: crypto.randomUUID(),
				message: "",
				from_user: false,
			};

			addChatMessage(aiResponseMessage);

			while (!chunk.done) {
				aiResponseMessage.message =
					aiResponseMessage.message + chunk.value;
				setChatHistory([...newChatHistory, aiResponseMessage]);
				chunk = await reader.read();
			}
			reset();
		} catch (error) {
			setChatHistory(fallbackChatHistory);
			const err = error as Error;
			setError("root.api_error", {
				message: err.message,
			});
		}
	};

	const addChatMessage = (message: Message) => {
		setChatHistory((prevChatHistory) => [...prevChatHistory, message]);
		moveViewToNewMessage();
	};

	const moveViewToNewMessage = () => {
		if (chatHistoryRef?.current) {
			chatHistoryRef.current.scrollTop =
				chatHistoryRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		if (!worker.current) {
			worker.current = new Worker(
				new URL("./services/worker.ts", import.meta.url),
				{
					type: "module",
				}
			);
		}
	}, [user]);

	return (
		<div
			className={`fixed inset-0 z-50 h-full w-full justify-center items-center space-x-4 bg-gray-500 bg-opacity-75 transition-opacity overflow-y-auto overflow-x-hidden outline-none ${
				user?.token && isModalOpen ? "flex" : "hidden"
			}`}
			aria-labelledby="modal-chat"
			role="dialog"
			aria-modal="true"
			aria-hidden={user?.token ? "true" : "false"}>
			<div className="flex relative flex-col rounded-lg bg-white shadow-xl transition-all p-4 w-full max-w-2xl">
				<div className="text-2xl font-bold mb-3">
					<p>
						Interview with{" "}
						{user?.company?.length ? user?.company : user?.name}
					</p>
					<button
						onClick={() => setIsModalOpen(false)}
						className="absolute top-2 right-2 p-2 z-50 text-2xl font-bold hover:text-gray-700 focus:outline-none">
						X
					</button>
				</div>
				<div className="relative rounded-lg bg-gray-100 mb-4 p-4">
					{(errors.root?.api_error || isSubmitting) && (
						<div className="absolute inset-0 w-full z-10">
							{errors.root?.api_error && (
								<p className="text-white font-medium text-sm italic px-4 py-2 bg-red-500">
									Oops! It seems like there's a bug in sending
									your request. Double-check and try again, or
									send a carrier pigeon as a backup. If the
									problem persists, contact your friendly
									neighborhood developer (that's me!) for
									assistance.
								</p>
							)}
							{isSubmitting && (
								<p className="text-white font-medium text-sm italic px-4 py-2 bg-slate-900">
									<span className="font-bold">
										This may take while!
									</span>{" "}
									You see servers are expensive and AI models
									are costly, so this message is sending to a
									server powered by Nibbles... the rabbit. So
									please be patient, Nibbles is doing their
									best.
								</p>
							)}
						</div>
					)}
					<div
						ref={chatHistoryRef}
						className="flex flex-col max-h-[66vh] overflow-y-auto">
						<MessageComponent
							message="Hello and welcome! Thank you for trying out this AI interview bot. Try asking an interview-style question about me, and I will answer it to the best of my ability."
							from_user={false}
						/>
						{chatHistory?.map((message: Message) => (
							<MessageComponent key={message.id} {...message} />
						))}
					</div>
					<div className={isSubmitting ? "block" : "hidden"}>
						<JumpingDots />
					</div>
				</div>
				<form
					className="flex items-center justify-center w-full"
					onSubmit={handleSubmit(onSubmit)}
					method="POST">
					<input
						type="checkbox"
						value="1"
						tabIndex={-1}
						autoComplete="off"
						className="hidden"
						{...register("message_me")}
					/>
					<div className="w-full mr-2">
						<input
							type="text"
							placeholder="Your message"
							disabled={isSubmitting}
							className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none disabled:bg-slate-100 disabled:text-slate-500"
							{...register("message", {
								required: "This is required",
							})}
						/>
						{errors.message && (
							<p className="text-red-500 text-xs italic">
								{errors.message.message}
							</p>
						)}
					</div>
					<button
						className="active:bg-scarlet-600 hover:shadow-lg focus:outline-none px-6 py-3 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-scarlet-500 rounded shadow outline-none disabled:bg-slate-100 disabled:text-slate-500"
						type="submit"
						disabled={isSubmitting}>
						Send
					</button>
				</form>
			</div>
		</div>
	);
};

export default ChatWindow;

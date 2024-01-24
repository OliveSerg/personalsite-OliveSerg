import { useUser } from "@features/user-auth";
import { useEffect, useRef, useState } from "react";
import { Message } from "./types/interview";
import { fetchAIResponse, fetchChatHistory } from "./services/chat-service";
import { useForm, SubmitHandler } from "react-hook-form";
import LoadingAnimation from "./loading-animation";
import ChatHistory from "./chat-history";

type MessageInput = {
	message: string;
	message_me: boolean;
};

const ChatWindow = () => {
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

	const onSubmit: SubmitHandler<MessageInput> = async (
		data: MessageInput
	) => {
		if (data.message_me || !user?.token) {
			return;
		}
		addChatMessage({
			id: crypto.randomUUID(),
			message: data.message,
			from_user: true,
		});

		try {
			const message = await fetchAIResponse(data.message, user?.token);
			addChatMessage(message);
			reset();
		} catch (error) {
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
		const fetchChatData = async () => {
			try {
				if (user?.token) {
					const history = await fetchChatHistory(user.token);
					setChatHistory(history.messages);
					moveViewToNewMessage();
				}
			} catch (error) {
				const err = error as Error;
				console.error(err.message);
			}
		};

		fetchChatData();
	}, [user]);

	return (
		<div
			className={`fixed inset-0 z-50 h-full w-full justify-center items-center space-x-4 bg-gray-500 bg-opacity-75 transition-opacity overflow-y-auto overflow-x-hidden outline-none ${
				user?.token ? "flex" : "hidden"
			}`}
			aria-labelledby="modal-chat"
			role="dialog"
			aria-modal="true"
			aria-hidden={user?.token ? "true" : "false"}>
			<div className="flex relative flex-col rounded-lg bg-white shadow-xl transition-all p-4 w-full max-w-2xl">
				<div className="relative rounded-lg bg-gray-100 mb-4 p-4">
					{errors.root?.api_error && (
						<div className="absolute inset-0 w-full">
							<p className="text-red-500 text-sm italic">
								Oops! It seems like there's a bug in sending
								your request. Double-check and try again, or
								send a carrier pigeon as a backup. If the
								problem persists, contact your friendly
								neighborhood developer (that's me!) for
								assistance.
							</p>
						</div>
					)}
					<div
						ref={chatHistoryRef}
						className="flex flex-col max-h-[66vh] overflow-y-auto">
						<ChatHistory chatHistory={chatHistory} />
					</div>
					<div className={isSubmitting ? "block" : "hidden"}>
						<LoadingAnimation />
					</div>
				</div>
				<form
					className="flex items-center justify-center w-full space-x-2"
					action={import.meta.env.VITE_API_URL + "interviews/"}
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
					<div className="w-full">
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

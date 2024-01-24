import { useUser } from "@features/user-auth";
import { useEffect, useState } from "react";
import { Message, Interview } from "./types/interview";
import { fetchChatHistory } from "./services/chat-service";
import { useForm, SubmitHandler } from "react-hook-form";
import MessageComponent from "./message-component";

type MessageInput = {
	message: string;
	message_me: boolean;
};

const ChatWindow = () => {
	const { user } = useUser();
	const [chatHistory, setChatHistory] = useState<Interview>();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful },
		setError,
	} = useForm<MessageInput>();

	const onSubmit: SubmitHandler<MessageInput> = async (
		data: MessageInput
	) => {
		try {
		} catch (error) {
			const err = error as Error;
			setError("root.api_error", {
				message: err.message,
			});
		}
	};

	useEffect(() => {
		const fetchChatData = async () => {
			try {
				if (user?.token) {
					console.log(user.token);

					const history = await fetchChatHistory(user.token);
					console.log(history);

					setChatHistory(history);
				}
			} catch (error) {
				const err = error as Error;
				console.error(err.message);
			}
		};

		fetchChatData();
	}, [user]);

	if (!user?.token) {
		return;
	}

	return (
		<div
			className={`relative z-10 ${user.token ? "block" : "hidden"}`}
			aria-labelledby="modal-chat"
			role="dialog"
			aria-modal="true">
			<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
			<div className="fixed inset-0 z-10 w-screen">
				<div className="flex min-h-full justify-center items-center">
					<div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all mx-4 p-4 w-full max-w-2xl sm:m-8">
						<div className="flex relative h-auto min-h-[75vh] flex-col justify-end rounded-lg bg-gray-100 mb-4 p-4 overflow-y-auto">
							{errors.root?.api_error && (
								<div className="absolute top-0 left-0 w-full mb-3">
									<p className="text-red-500 text-sm italic">
										Oops! It seems like there's a bug in
										sending your request. Double-check and
										try again, or send a carrier pigeon as a
										backup. If the problem persists, contact
										your friendly neighborhood developer
										(that's me!) for assistance.
									</p>
								</div>
							)}
							<MessageComponent
								message="Hello and welcome! Thank you for trying out this AI interview bot. Try asking an interview-style question about me, and I will answer it to the best of my ability."
								fromUser={false}
							/>
							{chatHistory?.messages.map((message: Message) => (
								<MessageComponent {...message} />
							))}
						</div>
						<form
							className="flex items-center justify-center w-full space-x-2"
							action={
								import.meta.env.VITE_API_URL + "interviews/"
							}
							onSubmit={handleSubmit(onSubmit)}
							method="POST">
							<input
								type="checkbox"
								value="1"
								tabIndex="-1"
								autoComplete="off"
								className="hidden"
								{...register("message_me")}
							/>
							<div className="w-full">
								<textarea
									placeholder="Your message"
									className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
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
								className="active:bg-scarlet-600 hover:shadow-lg focus:outline-none px-6 py-3 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-scarlet-500 rounded shadow outline-none"
								type="submit">
								Send
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatWindow;

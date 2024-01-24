import { Message as MessageProps } from "@features/chat/types/interview";

type Props = Omit<MessageProps, "id">;

const MessageComponent = ({ message, from_user }: Props) => {
	return (
		<div className={`flex ${from_user ? "justify-end" : "justify-start"}`}>
			<div
				className={`m-2 p-4 rounded font-medium ${
					from_user ? "bg-scarlet-100" : "bg-sunglow-100"
				}`}>
				<span className="mix-blend-difference invert">{message}</span>
			</div>
		</div>
	);
};

export default MessageComponent;

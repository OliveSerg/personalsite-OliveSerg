import { Message as MessageProps } from "@features/chat/types/interview";

const MessageComponent = ({ message, fromUser }: MessageProps) => {
	return (
		<div className={`flex ${fromUser ? "justify-end" : "justify-start"}`}>
			<div
				className={`m-2 p-4 rounded font-medium ${
					fromUser ? "bg-scarlet-100" : "bg-sunglow-100"
				}`}>
				<span className="mix-blend-difference invert">{message}</span>
			</div>
		</div>
	);
};

export default MessageComponent;

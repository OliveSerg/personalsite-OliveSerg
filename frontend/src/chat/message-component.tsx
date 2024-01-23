import { Message as MessageProps } from "@features/chat/types/interview";

const MessageComponent = ({ message, fromUser }: MessageProps) => {
	return <div className="">{message}</div>;
};

export default MessageComponent;

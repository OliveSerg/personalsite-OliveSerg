import MessageComponent from "./message-component";
import { Message } from "./types/interview";

type Props = {
	chatHistory: Message[];
};

const ChatHistory = ({ chatHistory }: Props) => {
	return (
		<>
			<MessageComponent
				message="Hello and welcome! Thank you for trying out this AI interview bot. Try asking an interview-style question about me, and I will answer it to the best of my ability."
				from_user={false}
			/>
			{chatHistory?.map((message: Message) => (
				<MessageComponent key={message.id} {...message} />
			))}
		</>
	);
};

export default ChatHistory;

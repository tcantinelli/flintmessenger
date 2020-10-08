import axios from 'axios';
import { IUsers } from "../users/types";
import { IConversation, IConversationMessage } from "./types";

/* Transform messages to conversations */
export const messagesToConversations = async (mainUser: IUsers | undefined, messages: IConversationMessage[]): Promise<IConversation[]> => {
	if (messages.length === 0 || mainUser === undefined) return []

	const batches = messages.reduce<{ [conversationId: string]: IConversationMessage[] }>(
		(res, message) => ({
			...res,
			[message.conversationId]: [...(res[message.conversationId] || []), message],
		}),
		{},
	);

	const conversations: IConversation[] = [];

	for (const conversationId in batches) {
		const messages = batches[conversationId];

		//Liste des attendees
		const targets = [...new Set(messages.flatMap(({ emitter, targets }) => [emitter, ...targets]))];

		conversations.push({
			_id: conversationId,
			main: false,
			targets: targets,
			messages: messages,
			updatedAt: getLastMessageDate(messages),
			unseenMessages: 0
		})
	}

	return conversations;
}

/* Get the last message of a conversation */
function getLastMessageDate(messages: IConversationMessage[]) {
	return messages[messages.length - 1].createdAt;
}

export const postNewMessage = (conversationId: string, targets: string[], content: string): void => {
	axios.post(`${process.env.REACT_APP_BACKEND}/messages`, {
		conversationId, targets, content,
		createdAt: new Date()
	}, {
		withCredentials: true
	});
};

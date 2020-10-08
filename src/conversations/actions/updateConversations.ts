import { UPDATE_CONVERSATIONS, IUpdateConversationsAction, IConversation } from '../types';

const updateConversations = (conversations: IConversation[]): IUpdateConversationsAction => {
	return {
		type: UPDATE_CONVERSATIONS,
		conversationsList: conversations
	}
}

export default updateConversations;

import { ThunkAction } from "redux-thunk";
import { IAppState } from '../../appReducer';
import addUnSeen from "../../users/actions/addUnSeen";
import makeUpdateConversations from "./makeUpdateConversations";
import { IConversationMessage, IConversationsAction } from "../types";

const addMessage = (message: IConversationMessage): ThunkAction<Promise<void>, IAppState, {}, IConversationsAction> => {
	return async function (dispatch, getState) {
		try {
			let newConversationsList = [...getState().conversations.conversationsList];
			const conversation = newConversationsList.find(conv => conv._id === message.conversationId);

			if (conversation === undefined) {
				// Create conversation with new message inside
				newConversationsList = [
					...newConversationsList,
					{
						_id: message.conversationId,
						main: false,
						targets: message.targets,
						unseenMessages: 1,
						updatedAt: message.createdAt,
						messages: [message]
					}
				]
			} else {
				// Update conversation with new message
				newConversationsList = [
					...newConversationsList.filter(conv => conv._id !== message.conversationId),
					{
						...conversation,
						updatedAt: message.createdAt,
						messages: [...conversation.messages, message],
					}
				]
				if(conversation.main) await dispatch(addUnSeen(conversation._id));
			}

			await dispatch(makeUpdateConversations(newConversationsList));
		} catch (_err) {
			return;
		}
	}
}

export default addMessage;
import { ThunkAction } from "redux-thunk";
import { IAppState } from '../../appReducer';
import { IPopOverAction } from "../../popover/types";
import updatePopOver from "../../popover/actions/updatePopOver";
import { IConversationMessage, IConversationsAction } from "../types";
import addMessage from "./addMessage";

const socketUpdateConversation = (message: IConversationMessage): ThunkAction<Promise<void>, IAppState, {}, IConversationsAction | IPopOverAction> => {
	return async function (dispatch, getState) {
		try {

			const mainConversation = getState().conversations.conversationsList.find(conversation => conversation.main);

			//Si le message n'est pas dans MainConversation => PopOver
			if(message.conversationId !== mainConversation?._id) {
				const emitter = getState().users.usersList.find(user => user._id === message.emitter);
				dispatch(updatePopOver({
					active: true,
					status: 'success',
					message: `Un nouveau message de ${emitter ? `${emitter.firstname} ${emitter.lastname}` : 'Inconnu(e)'}`
				}))
			}
			dispatch(addMessage(message));
		} catch (_err) {
			return;
		}
	}
}

export default socketUpdateConversation;

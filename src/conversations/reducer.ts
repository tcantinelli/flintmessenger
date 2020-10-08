import { UPDATE_CONVERSATIONS, IConversationsAction, IConversationsState } from "./types";

const initialState = {
	conversationsList: []
}

export function conversations(state: IConversationsState = initialState, action: IConversationsAction): IConversationsState {
	switch (action.type) {
		case UPDATE_CONVERSATIONS:
			return {
				...state,
				conversationsList: action.conversationsList
			};
		default:
			return state;
	}
}

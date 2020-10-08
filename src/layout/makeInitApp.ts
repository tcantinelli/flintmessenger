import { IAppState } from "../appReducer"
import fetchConversations from "../conversations/actions/fetchConversations"
import fetchUsers from "../users/actions/fetchUsers"
import makeStartSocket from "../socket/makeStartSocket"

export function makeInitApp() {
	return async (dispatch: any, getState: () => IAppState) => {
		if (getState().users.mainUser) {
			await dispatch(fetchUsers());
			await dispatch(fetchConversations());
			await dispatch(makeStartSocket());
		}
	}
}
import { IUsersAction, IUsersState, UPDATE_MAIN_USER, UPDATE_USERS_LIST } from "./types";

const initialState = {
	mainUser: undefined,
	usersList: []
}
export function users(state: IUsersState = initialState, action: IUsersAction): IUsersState {
	switch (action.type) {
		case UPDATE_MAIN_USER:
			return {
				...state,
				mainUser: action.mainUser
			};
		case UPDATE_USERS_LIST:
			return {
				...state,
				usersList: action.usersList
			};
		default:
			return state;
	}
}
export interface IUsers {
	_id: string;
	email: string;
	firstname: string;
	lastname: string;
	conversationSeen: {[conversationId: string] : string};
	connected: boolean;
	picture: string;
}

// --- Définition des types de l'actions ---
export const UPDATE_MAIN_USER = 'UPDATE_MAIN_USER';
export const UPDATE_USERS_LIST = 'UPDATE_USERS_LIST';

export interface IUpdateMainUserAction {
	type: typeof UPDATE_MAIN_USER,
	mainUser: IUsers | undefined
}

export interface IUpdateUsersListAction {
	type: typeof UPDATE_USERS_LIST,
	usersList: IUsers[]
}

export interface IUsersState {
	mainUser?: IUsers;
	usersList: IUsers[];
}

export type IUsersAction = IUpdateMainUserAction | IUpdateUsersListAction;
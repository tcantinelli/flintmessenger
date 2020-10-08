import { connect } from "./connect";
import { IAppState } from "../appReducer";
import { IConversationMessage } from "../conversations/types";
import { IUsers } from "../users/types";
import socketUpdateConversation from "../conversations/actions/socketUpdateConversation";
import socketUpdateUsersList from "../users/actions/socketUpdateUsersList";
import updateUsersList from "../users/actions/updateUsersList";

const makeStartSocket = () => {
	return async (dispatch: any, getState: () => IAppState) => {
		const socket = connect();

		socket.on('connect', () => {
			console.log('Received user connection');
		});

		socket.on('chat-message', (message: IConversationMessage) => {
			dispatch(socketUpdateConversation(message));
		});

		socket.on('user-connexion', (targetedUser: IUsers) => {
			dispatch(socketUpdateUsersList(targetedUser));
		});

		socket.on('user-update', (targetedUser: IUsers) => {
			if(targetedUser._id !== getState().users.mainUser?._id)	dispatch(updateUsersList([
				...getState().users.usersList.filter(user => user._id !== targetedUser._id),
				targetedUser
			]));
		})
	}
}

export default makeStartSocket;

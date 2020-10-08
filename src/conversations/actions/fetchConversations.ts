import axios from 'axios';
import { ThunkAction } from 'redux-thunk'
import { IAppState } from '../../appReducer';
import { messagesToConversations } from '../methods';
import { IConversationMessage, IConversationsAction } from '../types';
import selectMainConversation from './selectMainConversation';

const fetchConversations = (): ThunkAction<Promise<void>, IAppState, {}, IConversationsAction> => {
	return async function (dispatch, getState) {
		try {
			const response = await axios.get(`${process.env.REACT_APP_BACKEND}/messages`, { withCredentials: true });
			const messages: IConversationMessage[] = response.data;

			const mainUser = getState().users.mainUser;

			const conversations = await messagesToConversations(mainUser, messages);

			if (conversations.length > 0) dispatch(selectMainConversation(conversations[conversations.length - 1]._id, conversations));
		} catch (err) {
			console.log(err);

			// throw new Error('Erreur serveur')
		}
	};
}

export default fetchConversations;

import { ThunkAction } from 'redux-thunk'
import { IAppState } from '../../appReducer';
import addUnSeen from '../../users/actions/addUnSeen';
import { IConversation, IConversationsAction } from '../types';
import makeUpdateConversations from './makeUpdateConversations';

const selectMainConversation = (target: string, list?: IConversation[]): ThunkAction<Promise<void>, IAppState, {}, IConversationsAction> => {
	return async function (dispatch, getState) {

		let theList = list ? [...list] : [...getState().conversations.conversationsList];

		const newList:IConversation[] = theList.map(conversation => {
			return {
				...conversation,
				main: conversation._id === target
			}
		});
		await dispatch(addUnSeen(target));
		await dispatch(makeUpdateConversations(newList));
	};
}

export default selectMainConversation;

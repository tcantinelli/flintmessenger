import { ThunkAction } from 'redux-thunk'
import { IConversation, IConversationMessage, IConversationsAction } from '../types';
import { IAppState } from '../../appReducer';
import updateConversations from './updateConversations';

const makeUpdateConversations = (theList: IConversation[]): ThunkAction<Promise<void>, IAppState, {}, IConversationsAction> => {
	return async function (dispatch, getState) {
		try {
			//Compteur useen messages
			const theNewList = [...theList];

			theList.forEach((conversation, index) => {
				const conversationSeenDate = getState().users.mainUser?.conversationSeen[conversation._id] || new Date('2018-09-22T15:00:00').toDateString();
				const unseenCompteur = getUnseenMessagesCount(conversationSeenDate, conversation.messages);
				theNewList[index].unseenMessages = unseenCompteur;
			});

			dispatch(updateConversations(theNewList));
		} catch (err) {
			console.log(err);

			// throw new Error('Erreur serveur')
		}
	};
}

export default makeUpdateConversations;

function getUnseenMessagesCount(conversationSeenDate: string, targetedMessages: IConversationMessage[]): number {
	let unseenCompteur = 0;

	targetedMessages.forEach(message => {
		if (new Date(message.createdAt) > new Date(conversationSeenDate)) unseenCompteur++;
	})

	return unseenCompteur;
}
import React from 'react';
import ContactListItem from './ContactListItem';
import { IUsers } from './types';
import List from '@material-ui/core/List';
import history from '../history';
import { connect } from 'react-redux';
import { IAppState } from '../appReducer';
import { TDrawerContent } from '../layout/AppLayout';
import { IConversation } from '../conversations/types';
import { useLocation } from 'react-router-dom'
import updateConversations from '../conversations/actions/updateConversations';
import selectMainConversation from '../conversations/actions/selectMainConversation';

//Interfaces
interface IContactListProps {
	mainUser?: IUsers;
	users: IUsers[];
	conversationsList: IConversation[];
	triggerDrawer: (trigger: boolean, content: TDrawerContent) => void;
	updateConversations: (conversations: IConversation[]) => void;
	addConversation: (target: string, list: IConversation[]) => void;
}

const ContactList: React.FC<IContactListProps> = ({ mainUser, users, conversationsList, triggerDrawer, updateConversations, addConversation }) => {
	const createConversation = async (target: string) => {
		if (mainUser) {
			const conversationId = generateConversationId(mainUser._id, target);
			addConversation(conversationId, [
				...conversationsList,
				{
					_id: conversationId,
					main: false,
					targets: [mainUser._id, target],
					updatedAt: new Date(),
					unseenMessages: 0,
					messages: []
				}]);
			history.push('/');
			triggerDrawer(false, 'conversations');
		}
	}

	const addUserToMainConversation = async (target: string) => {

		const upList: IConversation[] = conversationsList.map(conversation => {
			return {
				...conversation,
				targets: conversation.main ? [...conversation.targets, target] : conversation.targets
			};
		});
		updateConversations(upList);
	}

	let location = useLocation();

	return (
		<List style={styles.container}>
			<h1 style={styles.title}> Liste des utilisateurs</h1>
			{users.map((user, index) => {
				return (
					<ContactListItem
						user={user}
						key={index}
						createConversation={createConversation}
						addTarget={addUserToMainConversation}
						location={location.pathname}
						targets={conversationsList.find(conversation => conversation.main)?.targets || []}
					/>
				)
			})}
		</List>
	);
}

const generateConversationId = (userId: string, target: string): string => {
	return Buffer.from([userId, target, new Date().toISOString()].join('_')).toString('base64');
}

const mapStateToProps = (state: IAppState) => ({
	mainUser: state.users.mainUser,
	users: state.users.usersList,
	conversationsList: state.conversations.conversationsList
});

const mapDispatchToProps = (dispatch: any) => ({
	updateConversations: (conversations: IConversation[]) => dispatch(updateConversations(conversations)),
	addConversation: (target: string, list: IConversation[]) => dispatch(selectMainConversation(target, list))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

const styles = {
	container: {
		width: '350px',
		overflow: 'auto'
	},
	listItem: {
		paddingLeft: '0px',
		paddingRight: '0px'
	},
	title: {
		fontSize: '1.2rem',
		textAlign: 'center' as const
	}
}

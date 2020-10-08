import React from 'react';
import { IConversation } from './types';
import List from '@material-ui/core/List';
import DrawerConversationsListItem from './DrawerConversationsListItem';
import { TDrawerContent } from '../layout/AppLayout';
import { connect } from 'react-redux';
import { IAppState } from '../appReducer';
import { IUsers } from '../users/types';

interface IDrawerConversationsListProps {
	conversations: IConversation[];
	mainUser?: IUsers;
	triggerDrawer: (trigger: boolean, content: TDrawerContent) => void;
}

const DrawerConversationsList: React.FC<IDrawerConversationsListProps> = ({ conversations, mainUser, triggerDrawer }) => {
	return (
		<List style={styles.container}>
			<h1 style={styles.title}> Liste des conversations</h1>
			{conversations.map((conversation, i) => {
				return <DrawerConversationsListItem conversation={conversation} triggerDrawer={triggerDrawer} userID={mainUser?._id} key={i} />
			})}
		</List >
	)
}

const mapStateToProps = (state: IAppState) => ({
	conversations: state.conversations.conversationsList,
	mainUser: state.users.mainUser
})

export default connect(mapStateToProps)(DrawerConversationsList);

const styles = {
	container: {
		width: '300px',
		overflow: 'auto'
	},
	title: {
		fontSize: '1.2rem',
		textAlign: 'center' as const
	}
}

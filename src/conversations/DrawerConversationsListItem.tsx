import React from 'react';
import { IConversation } from './types';
import { IUsers } from '../users/types';
import { ListItem, ListItemText, ListItemAvatar, Badge } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup/AvatarGroup';
import history from '../history';
import { TDrawerContent } from '../layout/AppLayout';
import { connect } from 'react-redux';
import { IAppState } from '../appReducer';
import format from 'date-fns/format';
import selectMainConversation from './actions/selectMainConversation';

interface IDrawerConversationsListItemProps {
	conversation: IConversation;
	users: IUsers[];
	userID?: string;
	triggerDrawer: (trigger: boolean, content: TDrawerContent) => void;
	selectConversation: (target: string) => void;
}

const DrawerConversationsListItem: React.FC<IDrawerConversationsListItemProps> = ({ conversation, users, userID, triggerDrawer, selectConversation }) => {

	const lastMessage = conversation.messages[conversation.messages.length - 1];

	const getUserFormList = (id: string) => users.find(user => user._id === id);

	const action = () => {
		selectConversation(conversation._id);
		history.push('/');
		triggerDrawer(false, 'conversations');
	}

	return (
		<ListItem alignItems="center" divider button
			onClick={() => action()}
			selected={conversation.main}
		>
			<ListItemAvatar>
				<AvatarGroup max={3} style={styles.avatarGrp}>
					{conversation.targets.map((target, index) => {
						if (target !== userID) {
							const user = getUserFormList(target);
							return <Avatar key={index} style={styles.avatar}>{`${user?.firstname[0]}${user?.lastname[0]}` || '?'}</Avatar>
						}
						return null;
					})}
				</AvatarGroup>
			</ListItemAvatar>
			<ListItemText
				primary={lastMessage?.content || ('Aucun message')}
				secondary={format(new Date(conversation.updatedAt), "dd'/'MM'/'yyyy HH'h'mm" )}
				primaryTypographyProps={{ noWrap: true }}
			/>
			<Badge badgeContent={conversation.unseenMessages} color="primary" />
		</ListItem >
	);
};

const mapStateToProps = ({ users }: IAppState) => ({
	users: users.usersList
})

const mapDispatchToProps = (dispatch: any) => ({
	selectConversation: (target: string) => dispatch(selectMainConversation(target))
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerConversationsListItem);

const styles = {
	avatarGrp: {
		marginRight: '5px'
	},
	avatar: {
		height: "35px",
		width: "35px"
	}
}
import React from 'react';
import { IUsers } from './types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemIcon } from '@material-ui/core';

import AddCommentIcon from '@material-ui/icons/AddComment';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import MyBadge from '../layout/MyBadge';

interface IContactListItemProps {
	user: IUsers;
	targets: string[];
	createConversation: (target: string) => void;
	addTarget: (target: string) => void;
	location: string;
}

const ContactListItem: React.FC<IContactListItemProps> = ({ user, targets, createConversation, addTarget, location }) => {

	return (
		<ListItem divider style={styles.container}>
			<MyBadge user={user} />
			<ListItemText style={styles.text}>
				{`${user.firstname} ${user.lastname}`}
			</ListItemText>
			{location === '/' && !targets.includes(user._id) ?
				<ListItemIcon onClick={(_event) => { addTarget(user._id) }}>
					<AddCommentIcon color="primary" style={styles.icon} />
				</ListItemIcon>
				: null}
			<ListItemIcon onClick={(_event) => { createConversation(user._id) }}>
				<FiberNewIcon color="primary" style={styles.icon} />
			</ListItemIcon>
		</ListItem>
	);
}

export default ContactListItem;

const styles = {
	container: {
		paddingLeft: '5px'
	},
	text: {
		marginRight: '5px',
	},
	icon: {
		cursor: 'pointer' as const
	}
}
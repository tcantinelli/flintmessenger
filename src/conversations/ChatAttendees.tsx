import React from 'react';
import { connect } from 'react-redux';
import { Grid, List, ListItem, ListItemText } from '@material-ui/core';
import { IUsers } from '../users/types';
import { IAppState } from '../appReducer';
import { IConversation } from './types';
import MyBadge from '../layout/MyBadge';

interface IChatAttendeesProps {
	usersList: IUsers[],
	mainConversation?: IConversation
}

const ChatAttendees: React.FC<IChatAttendeesProps> = ({ usersList, mainConversation }) => {

	const attendees = usersList.filter(user => mainConversation?.targets.includes(user._id)) || [];

	return (
		<Grid container
			direction="row"
			justify="center"
			alignItems="center"
			style={styles.container}
		>
			<List style={styles.listAttendees}>
				{attendees.map((attendee, index) => <ListItem key={index}>
					<MyBadge user={attendee} />
					<ListItemText>
						{attendee.firstname} {attendee.lastname}
					</ListItemText>
				</ListItem>)}
			</List>
		</Grid>
	);
};

const mapStateToProps = (state: IAppState) => ({
	usersList: state.users.usersList,
	mainConversation: state.conversations.conversationsList.find(conv => conv.main)
})

export default connect(mapStateToProps)(ChatAttendees);

const styles = {
	container: {
		padding: '10px',
		backgroundColor: 'white',
		borderRadius: '10px',
		height: '75vh',
		width: '100%'
	},
	listAttendees: {
		width: '100%',
		minHeight: '60vh',
		overflow: 'auto'
	}
}

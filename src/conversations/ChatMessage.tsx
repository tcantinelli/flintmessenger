import React from 'react';
import { Grid } from '@material-ui/core';
import { IConversationMessage } from './types';
import { IAppState } from '../appReducer';
import { IUsers } from '../users/types';
import { connect } from 'react-redux';
import MyBadge from '../layout/MyBadge';
import format from 'date-fns/format';

import DoneAllIcon from '@material-ui/icons/DoneAll';
import CheckIcon from '@material-ui/icons/Check';

interface IChatMessageProps {
	mainUserID: string;
	message: IConversationMessage;
	prevID: string | undefined;
	usersList: IUsers[];
}

const ChatMessage: React.FC<IChatMessageProps> = ({ mainUserID, message, prevID, usersList }) => {

	//Emetteur du message
	const emitter = usersList.find(user => user._id === message.emitter);

	//Liste des targets hors MainUser avec status de lecture
	const statusMessage: boolean[] = [];
	message.targets.filter(id => id !== mainUserID).forEach(userID => {
		const theUser = usersList.find(user => user._id === userID);
		if (theUser && theUser?.conversationSeen && theUser?.conversationSeen[message.conversationId]) {
			statusMessage.push(new Date(theUser?.conversationSeen[message.conversationId]) > new Date(message.createdAt));
		} else {
			statusMessage.push(false);
		}
	})

	return (
		<Grid item container
			direction="column"
			justify="center"
			alignItems={message.emitter === mainUserID ? 'flex-end' : 'flex-start'}
			style={prevID === message.emitter ? styles.containerNext : styles.containerFirst}
		>
			<Grid container
				direction="row"
				justify={message.emitter === mainUserID ? 'flex-end' : 'flex-start'}
				alignItems="center"
			>
				{emitter && emitter?._id !== mainUserID ?
					<Grid item style={styles.gridAvatar}>
						<MyBadge user={emitter} size={35} />
					</Grid >
					: null}
				<Grid item xs container
					direction="column"
					justify="center"
					alignItems={message.emitter === mainUserID ? 'flex-end' : 'flex-start'}
				>
					{/* MESSAGE */}
					<Grid item style={message.emitter === mainUserID ? styles.bubbleRight : styles.bubbledLeft}>
						{message.content}
					</Grid >
					{/* INFOS */}
					<Grid container
						direction="row"
						justify={message.emitter === mainUserID ? 'flex-end' : 'flex-start'}
						alignItems="center"
						spacing={2}
					>
						<Grid item style={styles.messageDate}>
							{format(new Date(message.createdAt), "dd'/'MM'/'yy HH'h'mm")}
						</Grid >
						{message.emitter === mainUserID ?
							<Grid item >
								{statusMessage.every(Boolean)
									? <DoneAllIcon style={styles.messageStatus} />
									: <CheckIcon style={{ ...styles.messageStatus, color: '#C0C1C0' }} />
								}
							</Grid >
							: null}
					</Grid >

				</Grid>
			</Grid >



		</Grid >
	)
};

const mapStateToProps = ({ users }: IAppState) => ({
	usersList: users.usersList
})

export default connect(mapStateToProps)(ChatMessage);

const commonContainer = {
	padding: '0px 10px',
	marginBottom: '0px'
};

const commonBubble = {
	padding: '10px 9px',
	minWidth: '20%',
	maxWidth: '80%',
	clear: 'both' as const,
	position: 'relative' as const,
	marginBottom: '4px'
};

const styles = {
	containerFirst: {
		...commonContainer,
		marginTop: '20px'
	},
	containerNext: {
		...commonContainer,
		marginTop: '8px'
	},
	gridAvatar: {
		width: '50px'
	},
	bubbledLeft: {
		...commonBubble,
		float: 'left' as const,
		marginRight: 'auto',
		WebkitBorderRadius: '8px 8px 8px 0px',
		MozBorderRadius: '8px 8px 8px 0px',
		OBborderRadius: '8px 8px 8px 0px',
		msBorderRadius: '8px 8px 8px 0px',
		borderRadius: '8px 8px 8px 0px',
		backgroundColor: '#1CDC6C',
		color: '#ffffff'
	},
	bubbleRight: {
		...commonBubble,
		float: 'right' as const,
		marginLeft: 'auto',
		WebkitBorderRadius: '8px 8px 0px 8px',
		MozBorderRadius: '8px 8px 0px 8px',
		OBborderRadius: '8px 8px 0px 8px',
		msBorderRadius: '8px 8px 0px 8px',
		borderRadius: '8px 8px 0px 8px',
		backgroundColor: '#5077E2',
		color: '#ffffff',
		textAlign: 'right' as const
	},
	messageDate: {
		color: '#C0C1C0',
		fontSize: '0.7rem'
	},
	messageStatus: {
		color: '#2BAACA',
		fontSize: '0.9rem',
	}
}
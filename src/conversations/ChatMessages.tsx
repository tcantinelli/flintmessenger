import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, List } from '@material-ui/core';
import { IConversation } from './types';
import { IUsers } from '../users/types';
import { IAppState } from '../appReducer';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { postNewMessage } from './methods';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CheckIcon from '@material-ui/icons/Check';

export interface IChatMessagesProps {
	user?: IUsers;
	conversationsList: IConversation[];
}

const ChatMessages: React.FC<IChatMessagesProps> = ({ user, conversationsList }) => {

	//For autoScroll to the last message
	const messagesEndRef = useRef<HTMLHeadingElement>(null);

	const scrollToBottom = () => {
		if (messagesEndRef && messagesEndRef.current) messagesEndRef.current.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "start"
		});
	}

	useEffect(scrollToBottom, [conversationsList]);

	const postMessage = async (messageField: string) => {
		const mainConversation = conversationsList.find(conversation => conversation.main);
		if (mainConversation && messageField.length > 0) {
			postNewMessage(mainConversation._id, mainConversation.targets, messageField);
		}
	}
	const theConversation = conversationsList.find(conversation => conversation.main);

	return (
		<Grid container
			direction="column"
			justify="center"
			alignItems="center"
			style={styles.container}
		>
			{/* INDICATIONS */}
			<Grid item container
				direction="row"
				justify="center"
				alignItems="center"
				style={styles.indicContainer}
			>
				<Grid item xs={6} style={styles.indication}>
					<CheckIcon style={{ ...styles.messageStatus, color: '#C0C1C0' }} />
					<span style={styles.indicationMessage}>Message envoyé</span>
				</Grid >
				<Grid item xs={6} style={styles.indication}>
					<DoneAllIcon style={styles.messageStatus} />
					<span style={styles.indicationMessage}>Message lu</span>
				</Grid >

			</Grid >
			{/* LIST MESSAGES */}
			<List component="nav" style={styles.listMessages}>
				{theConversation?.messages.map((message, index) =>
					<ChatMessage
						message={message}
						key={index}
						mainUserID={user?._id || ''}
						prevID={index > 0 ? theConversation.messages[index - 1].emitter : undefined}
					/>
				)}
				{/* Dummy Div for autoScrolling */}
				<div ref={messagesEndRef} />
			</List>
			{/* INPUT */}
			<Grid item container
				justify="center"
				alignItems="center"
				style={styles.inputContainer}
			>
				<ChatInput postMessage={postMessage} />
			</Grid>
		</Grid>
	);
}

const mapStateToProps = (state: IAppState) => ({
	user: state.users.mainUser,
	conversationsList: state.conversations.conversationsList
})

export default connect(mapStateToProps)(ChatMessages);

const styles = {
	container: {
		backgroundColor: 'white',
		borderRadius: '10px',
		height: '100%',
		width: '100%'
	},
	indicContainer: {
		height: '5%',
		overflow: 'hidden'
	},
	listMessages: {
		padding: '0px',
		width: '100%',
		height: '80%',
		overflow: 'auto'
	},
	inputContainer: {
		height: '15%',
		width: '100%',
	},
	indication: {
		textAlign: 'center' as const
	},
	indicationMessage: {
		color: '#C0C1C0',
		fontSize: '0.7rem'
	},
	messageStatus: {
		color: '#2BAACA',
		fontSize: '0.9rem',
		paddingRight: '5px'
	}
}

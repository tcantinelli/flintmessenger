import React from 'react';
import { Grid, IconButton, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

interface IChatInputProps {
	postMessage: (messageField: string) => void;
}

interface IChatInputState {
	messageField: string;
}

class ChatInput extends React.Component<IChatInputProps, IChatInputState> {

	constructor(props: IChatInputProps) {
		super(props);
		this.state = {
			messageField: ''
		}
	}

	postMessage = () => {
		this.props.postMessage(this.state.messageField);
		this.setState({messageField: ''});
	}

	render() {
		return (
			<Grid container
				direction="row"
				justify="center"
				alignItems="center"
				style={styles.container}
			>
				<Grid item xs={9}>
					<TextField
						value={this.state.messageField}
						onChange={(event) => this.setState({ messageField: event.target.value })}
						variant="outlined"
						style={styles.input}
						size="small"
					/>
				</Grid >
				<Grid item xs={2} container justify="center" alignItems="center">
					<IconButton onClick={() => this.postMessage()} aria-label="send" style={styles.sendButton}>
						<SendIcon fontSize="large"/>
					</IconButton>
				</Grid >

			</Grid >

		);
	}
}

export default ChatInput;

const styles = {
	container: {
		marginTop: 'auto',
		width: '100%'
	},
	input: {
		width: '100%'
	},
	sendButton: {
		color: '#2BAACA'
	}
}
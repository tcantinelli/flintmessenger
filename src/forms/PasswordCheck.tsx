import React from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import BlockIcon from '@material-ui/icons/Block';
import { Grid, Typography } from '@material-ui/core';

interface PasswordCheckProps {
	check: boolean;
	text: string;
}

class PasswordCheck extends React.Component<PasswordCheckProps>{
	render() {
		return <Grid container
			direction="row"
			alignItems="center"
			justify="flex-start"
			style={{ fontSize: '0.7rem', marginTop: '8px'}}
		>
			{this.props.check
				? <CheckCircleOutlineIcon style={{ fontSize: 'inherit', color: 'green' }} />
				: <BlockIcon style={{ fontSize: 'inherit', color: 'red' }} />}
			<Typography style={{ marginLeft: '0.2rem', fontSize: 'inherit' }}>{this.props.text}</Typography>
		</Grid>
	}
}

export default PasswordCheck;

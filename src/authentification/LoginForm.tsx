import React from 'react';
import { connect } from 'react-redux';

import { IFormField } from '../forms/types';
import { defaultFormField, emailField } from '../forms/formFields';
import FormTextField from '../forms/formTextField';

import { Button, Grid } from '@material-ui/core';

import login from '../users/actions/login';

interface ILoginFormState {
	email: IFormField;
	password: IFormField;
	[key: string]: IFormField;
}

interface ILoginFormProps {
	login: (email: string, password: string) => void;
}

class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {

	constructor(props: ILoginFormProps) {
		super(props);
		this.state = {
			email: emailField('email'),
			password: { ...defaultFormField('password', 'Password'), type: 'password' }
		}
		this.handleSubmit = this.handleSubmit.bind(this) // ou définir submit en arrow function : submit = () => {}
	}

	updateForm = (itemUp: IFormField) => {
		//Validations
		itemUp.validate();

		this.setState({ [itemUp.id]: itemUp });
	}

	handleSubmit() {
		if (!this.state.email.error && !this.state.password.error) {
			this.props.login(this.state.email.value, this.state.password.value);
		}
	}

	render() {
		const { email, password } = this.state;

		return (
			<form onSubmit={(event) => { event.preventDefault(); this.handleSubmit() }}>
				<Grid container
					direction="column"
					justify="center"
					alignItems="center"
					spacing={2}
					style={styles.container}
				>
					{[email, password].map((item, index) => {
						return <FormTextField item={item} key={index} updateForm={this.updateForm} />
					})}
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							type="submit"
						>Valider
					</Button>
					</Grid >
				</Grid >
			</form>
		)
	}
}

const mapDispatchToProps = (dispatch: any) => ({
	login: (email: string, password: string) => dispatch(login(email, password)),
});

export default connect(undefined, mapDispatchToProps)(LoginForm);

const styles = {
	container: {
		padding: '40px',
		height: '100%'
	},
	form: {
		height: '100%'
	}
}

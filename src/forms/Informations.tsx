import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../appReducer';
import { emailField, defaultFormField, passwordField } from './formFields';
import FormTextField from './formTextField';
import PassworValidationBlock from './PassworValidationBlock';
import { IFormField, IFormPasswordField } from './types';
import { IUsers } from '../users/types';
import { validatePassBisField } from './validationMethods';

export interface IInformationsProps {
	user?: IUsers;
	formAction: (email: string, firstname: string, lastname: string, passwordMain: string) => void;
	passRequired: boolean;
	emailID: string;
}

export interface IInformationsState {
	form: {
		email: IFormField;
		firstname: IFormField;
		lastname: IFormField;
		passwordMain: IFormPasswordField;
		passwordbis: IFormField;
		[key: string]: IFormField | IFormPasswordField;
	},
}

class Informations extends React.Component<IInformationsProps, IInformationsState> {
	constructor(props: IInformationsProps) {
		super(props);
		this.state = {
			form: {
				email: emailField(this.props.emailID),
				firstname: defaultFormField('firstname', 'Prénom'),
				lastname: defaultFormField('lastname', 'Nom'),
				passwordMain: {...passwordField(), required: this.props.passRequired},
				passwordbis: { ...defaultFormField('passwordbis', 'Répétez le mot de passe'), type: 'password', required: this.props.passRequired }
			}
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		//Update des champs email, firstname et lastname si utilisateur connecté
		const { user } = this.props;

		if (user) {
			const upForm = { ...this.state.form };

			upForm.email.value = user.email;
			upForm.firstname.value = user.firstname;
			upForm.lastname.value = user.lastname;

			this.setState({ form: upForm });
		}
	}

	//Update des champs avec vérification
	updateForm = (itemUp: IFormField | IFormPasswordField) => {
		//Validation of the field
		itemUp.validate();

		//Result
		let newForm = {
			...this.state.form,
			[itemUp.id === 'emailRegister' || itemUp.id === 'emailProfile' ? 'email' : itemUp.id]: itemUp
		};

		//Extra validation for passwordbis
		if (itemUp.id === 'passwordMain' || itemUp.id === 'passwordbis') {
			newForm.passwordbis.error = validatePassBisField(newForm.passwordMain.value, newForm.passwordbis.value);
		}

		this.setState({ form: newForm });
	}

	handleSubmit() {
		const { email, firstname, lastname, passwordMain, passwordbis } = this.state.form;
		if([email, firstname, lastname, passwordMain, passwordbis].every(item => item.error === null)) {
			this.props.formAction(email.value, firstname.value, lastname.value, passwordMain.value);
		}
	}

	render() {
		const { email, firstname, lastname, passwordMain, passwordbis } = this.state.form;

		return (
			<form onSubmit={(event) => { event.preventDefault(); this.handleSubmit() }} style={{ height: '100%' }}>
				<Grid container
					direction="row"
					justify="center"
					alignItems="flex-start"
					style={styles.formContainer}
				>
					{/* IDENTITY SECTION */}
					<Grid item xs={12} md={6} lg={5}
						container
						direction="column"
						justify="flex-start"
						alignItems="center"
						spacing={3}
						style={styles.block}
					>
						{[email, firstname, lastname].map((item, index) => {
							return <FormTextField item={item} key={index} updateForm={this.updateForm} />
						})}
					</Grid >

					{/* CREDENTIALS SECTION */}
					<Grid item xs={12} md={6} lg={7} container
						direction="row"
						justify="center"
						alignItems="center"
						spacing={3}
						style={styles.block}
					>
						<Grid item xs={12} lg={6} container
							direction="column"
							justify="center"
							alignItems="center"
							spacing={3}
							style={{ paddingLeft: '0px', paddingRight: '0px' }}
						>
							{[passwordMain, passwordbis].map((item, index) => {
								return <FormTextField item={item} key={index} updateForm={this.updateForm} />
							})}

						</Grid>
						<Grid item xs container
							direction="row"
							justify="center"
							alignItems="center"
							style={{ paddingLeft: '0px', paddingRight: '0px' }}
						>
							<PassworValidationBlock passwordChecks={passwordMain.blocks} />
						</Grid>
					</Grid >
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							type="submit"
						>Valider</Button>
					</Grid >
				</Grid >
			</form>
		);
	}
}

const mapStateToProps = ({ users }: IAppState) => ({
	user: users.mainUser
})

export default connect(mapStateToProps)(Informations);

const styles = {
	formContainer: {
		paddingBottom: '20px'
	},
	buttonContainer: {
		marginTop: '20px'
	},
	block: {
		padding: '12px'
	}
}
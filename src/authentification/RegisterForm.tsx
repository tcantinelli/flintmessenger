import React from 'react';
import { connect } from 'react-redux';
import Informations from '../forms/Informations';
import register from '../users/actions/register';

interface IRegisterFormProps {
	register: (email: string, firstname: string, lastname: string, password: string) => void;
}

const RegisterForm: React.FC<IRegisterFormProps> = ({ register }) => {

	const formAction = (email: string, firstname: string, lastname: string, passwordMain: string) => {
		register(email, firstname, lastname, passwordMain);
	};

	return <Informations formAction={formAction} passRequired={false} emailID="emailRegister" />
}

const mapDispatchToProps = (dispatch: any) => ({
	register: (email: string, firstname: string, lastname: string, password: string) => dispatch(register(email, firstname, lastname, password)),
});

export default connect(undefined, mapDispatchToProps)(RegisterForm);

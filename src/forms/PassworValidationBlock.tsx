import React from 'react';
import { Box } from '@material-ui/core';
import PasswordCheck from './PasswordCheck';

interface IPasswordChecks {
	hasLower: boolean;
	hasUpper: boolean;
	hasNumber: boolean;
	hasSymbol: boolean;
	hasValidLength: boolean;
}

interface IPassworValidationBlockProps {
	passwordChecks: IPasswordChecks;
}

const PassworValidationBlock: React.FC<IPassworValidationBlockProps> = ({ passwordChecks }) => {
	return (
		<Box style={{display: 'inline'}}>
			<PasswordCheck check={passwordChecks.hasLower} text="Le mot de passe contient une lettre minuscule" />
			<PasswordCheck check={passwordChecks.hasUpper} text="Le mot de passe contient une lettre majuscule" />
			<PasswordCheck check={passwordChecks.hasNumber} text="Le mot de passe contient un nombre" />
			<PasswordCheck check={passwordChecks.hasSymbol} text="Le mot de passe contient un caractère spécial" />
			<PasswordCheck check={passwordChecks.hasValidLength} text="Le mot de passe fait entre 8 et 30 caractères" />
		</Box>
	);
}

export default PassworValidationBlock;

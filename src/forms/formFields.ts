import { IFormField, IFormPasswordField } from './types';
import { validateRequiredField, validateEmailField, validatePasswordBlocks } from './validationMethods';

/* Default field*/
export const defaultFormField = (id: string, label: string): IFormField => {
	return {
		id,
		type: 'text',
		label,
		value: "",
		error: null,
		required: true,
		validate() {
			this.error = validateRequiredField(this.value) ? null : 'Ce champ est requis';
		}
	}
}

/* Email field */
export function emailField(id: string): IFormField {
	return {
		...defaultFormField(id, id === 'emailRegister' ? 'Email (même un faux...)' : 'Email'),
		validate() {
			this.error = validateEmailField(this.value);
		}
	}
}

/* Password field */
export function passwordField(): IFormPasswordField {
	return {
		...defaultFormField('passwordMain', 'Mot de passe'),
		type: 'password',
		blocks: {
			hasLower: false,
			hasUpper: false,
			hasNumber: false,
			hasSymbol: false,
			hasValidLength: false
		},
		validate() {
			this.error = null;
			this.blocks = validatePasswordBlocks(this.value, this.blocks);

			if(this.required) {
				this.error = validateRequiredField(this.value) ? null : 'Ce champ est requis';
				if(!this.error && Object.values(this.blocks).every(Boolean)) {
					this.error = null;
				} else {
					this.error = 'Champ non valide';
				}
			} else if(this.value !== '') {
				if(Object.values(this.blocks).every(Boolean)) {
					this.error = null;
				} else {
					this.error = 'Champ non valide';
				}
			}
		}
	}
}

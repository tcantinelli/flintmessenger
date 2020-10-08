import { IFormPasswordBlocks } from "./types";

//Valide si champ vide
export const validateRequiredField = (value: string): boolean => {
	return !!value;
}

//Valide champ vide + type email
export function validateEmailField(value: string): string | null {

	//Validation Required
	if (!validateRequiredField(value)) return 'Ce champ est requis';

	//Validation Email
	if (!(/^[a-z0-9-._]+@[a-z0-9-._]+\.[a-z]{2,}$/gi).test(value)) return "Le format de l'adresse mail est invalide";

	//All is OK!
	return null;
}

//Valide password BIS
export function validatePassBisField(main: string, bis: string): string | null {

	if(main !== bis) return "Le mot de passe n'est pas identique"

	//All is OK!
	return null;
}

//Validations de tous les critères de password
export function validatePasswordBlocks(value: string, blocks: IFormPasswordBlocks): IFormPasswordBlocks {

	blocks.hasLower = /[a-z]+/.test(value);
	blocks.hasUpper = /[A-Z]+/.test(value);
	blocks.hasNumber = /[0-9]+/.test(value);
	blocks.hasSymbol = /[^a-zA-Z0-9]+/.test(value);
	blocks.hasValidLength = /^.{8,20}$/.test(value);

	return blocks;
}

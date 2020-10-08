/* Default field*/
export interface IFormField {
	id: string;
	type: string;
	label: string;
	value: string;
	error: string | null;
	required: boolean;
	validate: () => void;
}

/* Password field */
export interface IFormPasswordBlocks {
	hasLower: boolean;
	hasUpper: boolean;
	hasNumber: boolean;
	hasSymbol: boolean;
	hasValidLength: boolean;
}

export interface IFormPasswordField extends IFormField {
	blocks: IFormPasswordBlocks;
}

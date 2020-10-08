import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { IFormField, IFormPasswordField } from './types';

interface IformTextFieldProps {
	item: IFormField | IFormPasswordField;
	updateForm: (itemUp: IFormField | IFormPasswordField) => void;
}

const FormTextField: React.FC<IformTextFieldProps> = ({ item, updateForm }) => {
	return (
		<Grid item >
			<TextField
				id={item.id}
				type={item.type}
				label={item.label}
				size="small"
				value={item.value}
				required={item.required}
				onChange={(event) => updateForm({ ...item, value: event.target.value })}
				variant="outlined"
				{...(item.error ? { error: true, helperText: item.error } : {})}
			/>
		</Grid >
	);
};

export default FormTextField;

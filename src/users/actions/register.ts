import axios from 'axios';
import { ThunkAction } from "redux-thunk";
import { IUpdateMainUserAction } from "../types";
import updateMainUser from './updateMainUser';

const register = (email: string, firstname: string, lastname: string, password: string): ThunkAction<Promise<void>, {}, {}, IUpdateMainUserAction> => {
	return async function (dispatch) {
		try {
			const response = await axios.post(`${process.env.REACT_APP_BACKEND}/register`,
				{ email, firstname, lastname, password },
				{ withCredentials: true });
			dispatch(updateMainUser(response.data));
		} catch (_err) {
			return;
		}
	}
}

export default register;

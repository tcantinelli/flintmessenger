import axios from 'axios';
import { ThunkAction } from "redux-thunk";
import { IUpdateMainUserAction } from "../types";
import updateMainUser from './updateMainUser';

const getMe = (): ThunkAction<Promise<void>, {}, {}, IUpdateMainUserAction> => {
	return async function (dispatch) {
		try {
			const response = await axios.get(`${process.env.REACT_APP_BACKEND}/users/me`, { withCredentials: true });
			dispatch(updateMainUser(response.data));
		} catch (_err) {
			return;
		}
	}
}

export default getMe;

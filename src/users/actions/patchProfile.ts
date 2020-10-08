import axios from 'axios';
import { ThunkAction } from "redux-thunk";
import updatePopOver from '../../popover/actions/updatePopOver';
import { IUpdateMainUserAction } from "../types";
import updateMainUser from './updateMainUser';

const patchProfile = (email: string, firstname: string, lastname: string, password: string): ThunkAction<Promise<void>, {}, {}, IUpdateMainUserAction> => {
	return async function (dispatch) {
		try {
			const response = await axios.patch(`${process.env.REACT_APP_BACKEND}/users`,
				{ email, firstname, lastname, password },
				{ withCredentials: true });
			dispatch(updateMainUser(response.data));
			dispatch(updatePopOver({
				active: true,
				status: 'success' as const,
				message: 'Mise à jour réussie'
			}));
		} catch (_err) {
			dispatch(updatePopOver({
				active: true,
				status: 'error' as const,
				message: 'Erreur mise à jour'
			}));
			return;
		}
	}
}

export default patchProfile;

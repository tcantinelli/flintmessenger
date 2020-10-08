import axios from 'axios';
import { ThunkAction } from "redux-thunk";
import { makeInitApp } from '../../layout/makeInitApp';
import updatePopOver from '../../popover/actions/updatePopOver';
import updateMainUser from './updateMainUser';

const login = (email: string, password: string): ThunkAction<Promise<void>, {}, {}, any> => {
	return async function (dispatch) {
		try {
			const response = await axios.post(`${process.env.REACT_APP_BACKEND}/login`,
				{ email, password },
				{ withCredentials: true });

			const user = response.data;

			if (user) {
				dispatch(updatePopOver({
					active: true,
					status: 'success' as const,
					message: 'Authentification réussie'
				}));
				setTimeout(() => {
					dispatch(updateMainUser(user));
					dispatch(makeInitApp());
				}, 3000);
			} else {
				dispatch(updatePopOver({
					active: true,
					status: 'error' as const,
					message: 'Erreur d\'authentification'
				}));
			}
		} catch (_err) {
			return;
		}
	}
}

export default login;

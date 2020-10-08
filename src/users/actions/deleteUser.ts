import axios from 'axios';
import { ThunkAction } from "redux-thunk";
import updatePopOver from '../../popover/actions/updatePopOver';
import { UPDATE_MAIN_USER } from '../types';

const deleteUser = (): ThunkAction<Promise<void>, {}, {}, any> => {
	return async function (dispatch) {
		try {
			const response = await axios.delete(`${process.env.REACT_APP_BACKEND}/bye`, { withCredentials: true });
			const user = response.data;

			if (user) {
				dispatch(updatePopOver({
					active: true,
					status: 'success' as const,
					message: 'A bientôt !!!'
				}));
				setTimeout(() => {
					dispatch({
						type: UPDATE_MAIN_USER,
						mainUser: undefined
					});
				}, 3000);
			} else {
				dispatch(updatePopOver({
					active: true,
					status: 'error' as const,
					message: 'Erreur serveur'
				}));
			}
		} catch (_err) {
			return;
		}
	}
}

export default deleteUser;

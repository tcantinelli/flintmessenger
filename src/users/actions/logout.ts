import axios from 'axios';
import { ThunkAction } from "redux-thunk";
import updatePopOver from '../../popover/actions/updatePopOver';
import { UPDATE_MAIN_USER } from '../types';

const logout = (): ThunkAction<Promise<void>, {}, {}, any> => {
	return async function (dispatch) {
		try {
			const response = await axios.get(`${process.env.REACT_APP_BACKEND}/logout`, { withCredentials: true });

			const reponse = response.data;

			if (reponse) {
				dispatch({
					type: UPDATE_MAIN_USER,
					mainUser: undefined
				});
			} else {
				dispatch(updatePopOver({
					active: true,
					status: 'error' as const,
					message: 'Erreur deconnexion'
				}));
			}
		} catch (_err) {
			return;
		}
	}
}

export default logout;

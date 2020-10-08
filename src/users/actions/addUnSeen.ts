import axios from 'axios';
import { ThunkAction } from "redux-thunk";
import { IUpdateMainUserAction } from "../types";
import updateMainUser from './updateMainUser';

const addUnSeen = (conversationId: string): ThunkAction<Promise<void>, {}, {}, IUpdateMainUserAction> => {
	return async function (dispatch) {
		try {
			const response = await axios.patch(`${process.env.REACT_APP_BACKEND}/users/saw`, {
				conversationId,
				dateSeen: new Date().toISOString()
			}, { withCredentials: true });
			await dispatch(updateMainUser(response.data));
		} catch (_err) {
			return;
		}
	}
}

export default addUnSeen;
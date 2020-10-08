import axios from 'axios';
import { ThunkAction } from "redux-thunk";
import { IAppState } from '../../appReducer';
import { IUpdateUsersListAction, IUsers } from "../types";
import updateUsersList from './updateUsersList';

const fetchUsers = (): ThunkAction<Promise<void>, IAppState, {}, IUpdateUsersListAction> => {
	return async function (dispatch, getState) {
		try {
			const response = await axios.get(`${process.env.REACT_APP_BACKEND}/users`, { withCredentials: true });
			dispatch(updateUsersList(response.data.filter((user:IUsers) => user._id !== getState().users.mainUser?._id))) ;
		} catch (_err) {
			return;
		}
	}
}

export default fetchUsers;

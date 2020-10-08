import { ThunkAction } from "redux-thunk";
import { IAppState } from '../../appReducer';
import updatePopOver from "../../popover/actions/updatePopOver";
import { IPopOverAction } from "../../popover/types";
import { IUpdateUsersListAction, IUsers } from "../types";
import updateUsersList from './updateUsersList';

const socketUpdateUsersList = (targetedUser: IUsers): ThunkAction<Promise<void>, IAppState, {}, IUpdateUsersListAction | IPopOverAction> => {
	return async function (dispatch, getState) {
		try {
			if (targetedUser._id !== getState().users.mainUser?._id) {
				dispatch(updatePopOver({
					active: true,
					status: targetedUser.connected ? 'success' : 'warning',
					message: `${targetedUser.firstname} ${targetedUser.lastname} est ${targetedUser.connected ? 'connecté(e)' : 'déconnecté(e)'}`
				}))
				dispatch(updateUsersList([
					...getState().users.usersList.filter(user => user._id !== targetedUser._id),
					targetedUser
				]));
			}
		} catch (_err) {
			return;
		}
	}
}

export default socketUpdateUsersList;

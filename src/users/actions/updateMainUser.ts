import { ThunkAction } from "redux-thunk";
import { IUsers, UPDATE_MAIN_USER, IUpdateMainUserAction } from "../types";

const updateMainUser = (user: IUsers): ThunkAction<Promise<void>, {}, {}, IUpdateMainUserAction> => {
	return async function(dispatch) {
		dispatch({
			type: UPDATE_MAIN_USER,
			mainUser: user
		})
	}
}

export default updateMainUser;

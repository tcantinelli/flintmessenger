import { ThunkAction } from 'redux-thunk'
import { IPopOver, IPopOverAction, UPDATE_POPOVER } from '../types';

const updatePopOver = (datas: IPopOver): ThunkAction<Promise<void>, {}, {}, IPopOverAction> => {
	return async function (dispatch) {
		try {
			dispatch({
				type: UPDATE_POPOVER,
				datas: datas
			});
		} catch (err) {
			console.log(err);
		}
	};
}

export default updatePopOver;

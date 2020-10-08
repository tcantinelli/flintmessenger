import { IPopOver, IPopOverAction, UPDATE_POPOVER } from "./types";

export const initialState: IPopOver = {
		active: false,
		status: 'success' as const,
		message: ''
}

export function popover(state: IPopOver = initialState, action: IPopOverAction): IPopOver {
	switch (action.type) {
		case UPDATE_POPOVER:
			return action.datas;
		default:
			return state;
	}
}
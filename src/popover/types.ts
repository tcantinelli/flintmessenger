export type IPopOver = {
		active: boolean;
		status: 'success' | 'warning' | 'error';
		message: string;
}

// --- Définition des types de l'actions ---
export const UPDATE_POPOVER = 'UPDATE_POPOVER';

export interface IPopOverAction {
	type: typeof UPDATE_POPOVER,
	datas: IPopOver
}

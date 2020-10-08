import { combineReducers } from "redux";
import { users } from './users/reducer';
import { conversations } from './conversations/reducer';
import { popover } from './popover/reducer';

export const appReducer = combineReducers({
users, conversations, popover
})

export type IAppState = ReturnType<typeof appReducer>;

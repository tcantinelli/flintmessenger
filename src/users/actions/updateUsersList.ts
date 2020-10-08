import { IUsers, UPDATE_USERS_LIST, IUpdateUsersListAction } from "../types";

const updateUsersList = (users: IUsers[]): IUpdateUsersListAction => {
  return {
    type: UPDATE_USERS_LIST,
    usersList: users
  }
}

export default updateUsersList;

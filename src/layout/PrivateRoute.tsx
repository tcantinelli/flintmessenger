import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { IAppState } from "../appReducer";
import { IUsers } from "../users/types";

interface IPrivateRouteProps {
	user?: IUsers;
	component: any;
	path: string;
	exact: boolean;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ user, path, exact, component }) => {
	return (
		user
			? <Route path={path} exact={exact} component={component} />
			: <Redirect to="/login" />);
};

const mapStateToProps = ({ users }: IAppState) => ({
	user: users.mainUser
})

export default connect(mapStateToProps)(PrivateRoute);

import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ChatUI from '../conversations/ChatUI';
import MyProfile from '../profile/MyProfile';

const AppContent: React.FC<{}> = () => {
	return (
		<Switch>
			<PrivateRoute path='/profile' exact component={MyProfile} />
			<PrivateRoute path='/' exact component={ChatUI} />
		</Switch>
	);
};

export default AppContent;

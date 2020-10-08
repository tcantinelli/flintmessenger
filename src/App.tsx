import React from 'react';
import './App.css';
import { Router } from 'react-router-dom';
import history from './history';
import { ThemeProvider } from '@material-ui/core';
import theme from './utils/theme';

import AppLayout from './layout/AppLayout';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
	return (
		<Provider store={store}>
			<Router history={history}>
				<ThemeProvider theme={theme}>
					<AppLayout />
				</ThemeProvider>
			</Router>
		</Provider>
	);
}

export default App;

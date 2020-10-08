import React from 'react';

import { connect } from 'react-redux';
import { IAppState } from '../appReducer';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { IUsers } from '../users/types';

import AppContent from './AppContent';
import AppMenu from './AppMenu';
import DrawerConversationsList from '../conversations/DrawerConversationsList';
import ContactList from '../users/ContactList';
import LoginScreen from '../authentification/LoginScreen';

import { IPopOver } from '../popover/types';
import updatePopOver from '../popover/actions/updatePopOver';
import { makeInitApp } from './makeInitApp';

export type TDrawerContent = 'contacts' | 'conversations' | undefined;

interface IAppLayoutProps {
	user?: IUsers,
	pop: IPopOver,
	updatePopOver: (pop: IPopOver) => void;
	initApp: () => void;
}

interface IAppLayoutState {
	drawer: {
		show: boolean;
		content: TDrawerContent;
	}
}

class AppLayout extends React.Component<IAppLayoutProps, IAppLayoutState> {

	constructor(props: IAppLayoutProps) {
		super(props);
		this.state = {
			drawer: {
				show: false,
				content: undefined
			}
		}
	}

	//Initialisation App
	componentDidUpdate(prevProps: IAppLayoutProps) {
		if (prevProps.user === undefined && this.props.user !== undefined) {
			this.props.initApp();
		}
	}

	toggleDrawer = (trigger: boolean) => (
		event: React.KeyboardEvent | React.MouseEvent,
	) => {

		if (
			event &&
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}
		this.setState({ drawer: { ...this.state.drawer, show: trigger } });
	};

	triggerDrawer = (showState: boolean, content: TDrawerContent = undefined) => {
		this.setState({ drawer: { show: showState, content: content } });
	};

	//PopOver
	Alert = (props: AlertProps) => {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		this.props.updatePopOver({ ...this.props.pop, active: false });
	};

	render() {
		const { show, content } = this.state.drawer;
		const { user, pop } = this.props;

		return (
			<>
				<AppMenu triggerDrawer={this.triggerDrawer} />
				{user ? (
					<>
						<AppContent />
						<SwipeableDrawer
							anchor="left"
							open={show}
							onClose={this.toggleDrawer(false)}
							onOpen={this.toggleDrawer(true)}
							style={{ width: "60%" }}
						>
							{content && content === 'contacts'
								? <ContactList triggerDrawer={this.triggerDrawer} />
								: <DrawerConversationsList triggerDrawer={this.triggerDrawer} />
							}
						</SwipeableDrawer>
					</>
				) : <LoginScreen />
				}
				<Snackbar open={pop.active} autoHideDuration={2000} onClose={this.handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
					<Alert onClose={this.handleClose} severity={pop.status}>
						{pop.message}
					</Alert>
				</Snackbar>
			</>
		);
	}
}

const mapStateToProps = (state: IAppState) => ({
	user: state.users.mainUser,
	pop: state.popover
});

const mapDispatchToProps = (dispatch: any) => ({
	updatePopOver: (pop: IPopOver) => dispatch(updatePopOver(pop)),
	initApp: () => dispatch(makeInitApp())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);

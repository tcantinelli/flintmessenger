import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import IconButton from '@material-ui/core/IconButton';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import history from '../history';

import ContactsIcon from '@material-ui/icons/Contacts';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import ListIcon from '@material-ui/icons/List';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { TDrawerContent } from './AppLayout';
import { IAppState } from '../appReducer';
import { connect } from 'react-redux';
import { IUsers } from '../users/types';
import { Badge, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import logout from '../users/actions/logout';
import { IConversation } from '../conversations/types';

import logo from "./FlintMessenger.png";

interface IAppMenuProps {
	triggerDrawer: (trigger: boolean, content: TDrawerContent) => void;
	user?: IUsers;
	usersList: IUsers[];
	conversations: IConversation[];
	logout: () => void;
}

const AppMenu: React.FC<IAppMenuProps> = ({ triggerDrawer, user, usersList, conversations, logout }) => {

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const classes = useStyles();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (item: string) => {
		if (item === 'profile') {
			history.push('/profile');
		} else if (item === 'logout') {
			logout();
		}
		setAnchorEl(null);
	};


	return (
		<>
			<AppBar position="static">
				<Toolbar className={classes.appBar}>
					<img src={logo} alt="logo" className={classes.image} />
					{user ?
						<>
							<div className={classes.grow} />
							<div>
								<IconButton onClick={() => triggerDrawer(true, 'contacts')} aria-label="contacts">
									<Badge badgeContent={usersList.filter(user => user.connected).length} color="secondary">
										<ContactsIcon className={classes.icon} />
									</Badge>
								</IconButton>

								<IconButton onClick={() => triggerDrawer(true, 'conversations')} aria-label="messages">
									<Badge badgeContent={conversations.reduce((sum, conversation) => sum + conversation.unseenMessages, 0)} color="secondary">
										<SpeakerNotesIcon className={classes.icon} />
									</Badge>
								</IconButton>

								<IconButton aria-label="profile" onClick={handleClick}>
									<AccountCircle className={classes.icon} />
								</IconButton>
							</div>
						</>
						: null}
				</Toolbar>
			</AppBar>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={() => handleClose('profile')}>
					<ListItemIcon>
						<ListIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Mon profil" />
				</MenuItem>
				<MenuItem onClick={() => handleClose('logout')}>
					<ListItemIcon>
						<ExitToAppIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Se déconnecter" />
				</MenuItem>
			</Menu>
		</>
	);
}

const mapStateToProps = (state: IAppState) => ({
	user: state.users.mainUser,
	usersList: state.users.usersList,
	conversations: state.conversations.conversationsList
});

const mapDispatchToProps = (dispatch: any) => ({
	logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			height: '15vw',
			[theme.breakpoints.up(750)]: {
				height: '6vw',
			},
			padding: '0px 5px',
			backgroundColor: 'white'
		},
		image: {
			height: '80%',
			width: 'auto'
		},
		icon: {
			fontSize: '6vw',
			[theme.breakpoints.up(750)]: {
				fontSize: '4vw',
			},
			[theme.breakpoints.up(900)]: {
				fontSize: '3vw',
			},
			color: '#2BAACA',
		},
		grow: {
			flexGrow: 1
		}
	})
);

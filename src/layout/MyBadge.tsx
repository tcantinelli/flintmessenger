import React from 'react';
import Badge from '@material-ui/core/Badge';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import { Avatar, ListItemAvatar } from '@material-ui/core';
import { IUsers } from '../users/types';

interface IMyBadgeProps {
	user?: IUsers;
	size?: number;
}

const StyledBadge = withStyles((theme: Theme) =>
	createStyles({
		badge: {
			backgroundColor: '#44b700',
			color: '#44b700',
			boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
			'&::after': {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				borderRadius: '50%',
				animation: '$ripple 1.2s infinite ease-in-out',
				border: '1px solid currentColor',
				content: '""',
			},
		},
		'@keyframes ripple': {
			'0%': {
				transform: 'scale(.8)',
				opacity: 1,
			},
			'100%': {
				transform: 'scale(2.4)',
				opacity: 0,
			},
		},
	}),
)(Badge);

const MyBadge: React.FC<IMyBadgeProps> = ({ user, size = 40 }) => {
	return (
		<ListItemAvatar>
			<StyledBadge
				overlap="circle"
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				variant="dot"
				invisible={user ? !user.connected : true}
			>
				{user && user.picture?.length > 0
					? <Avatar alt={`${user.firstname} ${user.lastname}`} src={`${process.env.REACT_APP_BACKEND}/images/${user.picture}`} />
					: <Avatar style={{ height: size, width: size }} >{user ? `${user.firstname[0].toUpperCase()}${user.lastname[0].toUpperCase()}` : '?'}</Avatar>
				}
			</StyledBadge>
		</ListItemAvatar>
	);
};

export default MyBadge;

import React, { useState, useEffect } from 'react';
import { Grid, Hidden } from '@material-ui/core';
import ChatAttendees from './ChatAttendees';
import ChatMessages from './ChatMessages';
import { Theme, makeStyles } from '@material-ui/core/styles';

const ChatUI: React.FC<{}> = () => {
	const [windowHeight, setWindowHeight] = useState<number | undefined>(undefined);

	useEffect(() => {
		function handleResize() {
			setWindowHeight(window.innerHeight);
		}

		// Add event listener
		window.addEventListener("resize", handleResize);

		// Call handler right away so state gets updated with initial window size
		handleResize();

		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const classes = useStyles(windowHeight || 500);

	return (
		<Grid container
			direction="row"
			justify="center"
			alignItems="center"
			className={classes.view}
		>
			<Grid item xs={12} sm={10} md={6} lg={5} className={classes.container}>
				<ChatMessages />
			</Grid>
			<Hidden smDown>
				<Grid item sm={7} md={5} lg={3} className={classes.container}>
					<ChatAttendees />
				</Grid>
			</Hidden>
		</Grid>
	)
}

export default ChatUI;

const useStyles = makeStyles<Theme, number>(theme => ({
	view: {
		height: (windowHeight) => `calc(${windowHeight}px - 15vw)`,
		[theme.breakpoints.up(750)]: {
			height: (windowHeight) => `calc(${windowHeight}px - 6vw)`,
		},
		padding: '20px 0px',
	},
	container: {
		height: (windowHeight) => `calc(${windowHeight}px - 15vw - 40px)`,
		[theme.breakpoints.up(750)]: {
			height: (windowHeight) => `calc(${windowHeight}px - 6vw - 40px)`
		},
		margin: '0px 20px 0px 20px',
		[theme.breakpoints.up('sm')]: {
			borderRadius: '10px',
			border: '2px solid #2BAACA',
		}
	}
}));

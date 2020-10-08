import React, { useState, useEffect } from 'react';
import { Grid, Tabs, Tab } from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Theme, makeStyles } from '@material-ui/core/styles';

import LoginTabPanel from './LoginTabPanel';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const LoginScreen: React.FC<{}> = () => {

	const [tab, setTab] = useState<number>(0);
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
			alignItems="flex-start"
			className={classes.view}
		>
			<Grid item xs={12} sm={10} xl={8} className={classes.container}>
				<Tabs
					value={tab}
					onChange={(_, newTab) => setTab(newTab)}
					variant="fullWidth"
					indicatorColor="primary"

				>
					<Tab label="Se connecter" icon={<PersonIcon />} />
					<Tab label="S'enregistrer" icon={<PersonAddIcon />} />
				</Tabs>
				<LoginTabPanel index={0} valueTab={tab}>
					<LoginForm />
				</LoginTabPanel>
				<LoginTabPanel index={1} valueTab={tab}>
					<RegisterForm />
				</LoginTabPanel>
			</Grid >
		</Grid >
	);
}

export default LoginScreen;

const useStyles = makeStyles<Theme, number>(theme => ({
	view: {
		height: (windowHeight) => `calc(${windowHeight}px - 15vw)`,
		[theme.breakpoints.up(750)]: {
			height: (windowHeight) => `calc(${windowHeight}px - 6vw)`,
		},
		backgroundColor: 'white',
		padding: '20px 0px'
	},
	container: {
		maxHeight: (windowHeight) => `calc(${windowHeight}px - 15vw - 40px)`,
		[theme.breakpoints.up(750)]: {
			maxHeight: (windowHeight) => `calc(${windowHeight}px - 6vw - 40px)`
		},
		[theme.breakpoints.up('sm')]: {
			borderRadius: '10px',
			border: '2px solid #2BAACA'
		},
	}
}));
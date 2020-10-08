import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import BlockTitle from '../layout/BlockTitle';
import patchProfile from '../users/actions/patchProfile';
import Informations from '../forms/Informations';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import deleteUser from '../users/actions/deleteUser';

interface IMyProfileProps {
	updateMainUser: (email: string, firstname: string, lastname: string, password: string) => void;
	deleteUser: () => void;
}

const MyProfile: React.FC<IMyProfileProps> = ({ updateMainUser, deleteUser }) => {
	const classes = useStyles();

	const formAction = (email: string, firstname: string, lastname: string, passwordMain: string) => {
		updateMainUser(email, firstname, lastname, passwordMain);
	};

	return (
		<Grid container
			direction="column"
			justify="flex-start"
			alignItems="center"
			className={classes.view}
		>
			<Grid item xs={12} sm={11} xl={8} className={classes.infosContainer}>
				<BlockTitle title="Modifier vos informations" />
				<Informations formAction={formAction} passRequired={false} emailID="email" />
			</Grid >
			<Grid item xs={12} sm={11} xl={8} className={classes.deleteContainer}>
				<BlockTitle title="Supprimer votre compte" />
				<Button variant="contained" color="secondary" onClick={deleteUser}>Supprimer</Button>
			</Grid >
		</Grid >
	);
}

const mapDispatchToProps = (dispatch: any) => ({
	updateMainUser: (email: string, firstname: string, lastname: string, password: string) => dispatch(patchProfile(email, firstname, lastname, password)),
	deleteUser: () => dispatch(deleteUser())
});

export default connect(undefined, mapDispatchToProps)(MyProfile);

const defaultContainer = {
	backgroundColor: 'white',
	width: '100%',
	marginTop: '30px',
}
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		view: {
			minHeight: '85vw',
			[theme.breakpoints.up(750)]: {
				minHeight: '94vw',
			},
			backgroundColor: 'white'
		},
		infosContainer: {
			...defaultContainer,
			minHeight: '20vh',
			[theme.breakpoints.only('xs')]: {
				borderTop: '2px solid #2BAACA',
			},
			[theme.breakpoints.up('sm')]: {
				borderRadius: '10px',
				border: '2px solid #2BAACA'
			},
		},
		deleteContainer: {
			...defaultContainer,
			textAlign: 'center' as const,
			paddingBottom: '20px',
			[theme.breakpoints.only('xs')]: {
				borderTop: '2px solid #2BAACA',
			},
			[theme.breakpoints.up('sm')]: {
				borderRadius: '10px',
				border: '2px solid #2BAACA'
			},
		}
	})
);

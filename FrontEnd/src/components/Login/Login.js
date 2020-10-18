import React, { useState, useEffect } from 'react';
import { Container, makeStyles, Typography, Button } from '@material-ui/core';
import { FlexContainer, Input, Spacing } from '../../styles/StylingComponents';
import FCAppBar from '../FCAppBar/FCAppBar';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme) => ({
	root               : {
		flexGrow : 1
	},
	loginBody          : {
		minHeight      : '80vh',
		marginTop      : theme.spacing(10),
		display        : 'flex',
		flexDirection  : 'row',
		justifyContent : 'center',
		width          : '100%'
	},
	bodyContainer      : {
		color          : '#fff',
		display        : 'flex',
		flexDirection  : 'column',
		alignItems     : 'center',
		justifyContent : 'center',
		textAlign      : 'left',
		width          : '100%'
	},
	bodyContainerRight : {
		color          : '#fff',
		display        : 'flex',
		flexDirection  : 'column',
		alignItems     : 'center',
		justifyContent : 'center',
		textAlign      : 'left',
		width          : '100%'
	},
	loginButton        : {
		color           : 'white',
		backgroundColor : '#2A5655',
		maxHeight       : theme.spacing(5),
		minWidth        : theme.spacing(20),
		marginLeft      : theme.spacing(20),

		'&:hover'       : {
			backgroundColor : '#C0D8C5',
			color           : '#000'
		}
	},
	heading            : {
		color        : '#3F8C7B',
		width        : '100%',
		marginBottom : theme.spacing(5)
	},
	subHeading         : {
		fontWeight : 400,
		width      : '100%',
		color      : '#000',
		textAlign  : 'left'
	},
	caption            : {
		fontWeight : 400,
		width      : '100%',
		color      : '#000',
		marginTop  : theme.spacing(10)
	}
}));

function Login (props) {
	const classes = useStyles();
	const { loginWithRedirect } = useAuth0();
	const withEmail = () => {
		return props.history.push('./LoginWithEmail');
	};

	return (
		<Container className={classes.root}>
			<FCAppBar {...props} />
			<Container className={classes.loginBody} maxWidth='xl'>
				<FlexContainer flexDirection={'row'}>
					<div className={classes.bodyContainer}>
						<Typography variant='h1' className={classes.heading}>
							Code Platoon
						</Typography>
						<Typography variant='h6' className={classes.subHeading}>
							Coding Bootcamp for veterants and spouses.
						</Typography>
						<Typography variant='h6' className={classes.subHeading}>
							Are you ready to get started with Code Platoon?
						</Typography>
						<Typography variant='h6' className={classes.caption}>
							Take your first step by Logging in
						</Typography>
					</div>
					<div className={classes.bodyContainerRight}>
						<Button variant='contained' className={classes.loginButton} onClick={() => loginWithRedirect()}>
							Login
						</Button>
						{/* <br />
						<Button variant='contained' className={classes.loginButton} onClick={withEmail}>
							Login with email
						</Button> */}
					</div>
				</FlexContainer>
			</Container>
		</Container>
	);
}

export default Login;

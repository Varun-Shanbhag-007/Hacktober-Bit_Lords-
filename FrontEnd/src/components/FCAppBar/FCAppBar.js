import React, { Fragment, cloneElement, useState } from 'react';
import {
	AppBar,
	CssBaseline,
	useScrollTrigger,
	Toolbar,
	Typography,
	IconButton,
	Avatar,
	Menu,
	MenuItem,
	makeStyles
} from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme) => ({
	menuButton     : {
		marginRight : theme.spacing(2)
	},
	large          : {
		width  : theme.spacing(7),
		height : theme.spacing(5)
	},
	appBar         : {
		backgroundColor : '#2A5655'
	},
	userIconButton : {
		margin                         : '0px 10px',
		marginLeft                     : 'auto',
		display                        : 'flex',
		flexDirection                  : 'row',
		alignItems                     : 'center',
		[theme.breakpoints.down('md')]: {
			margin : 'auto'
		}
	}
}));

function ElevationScroll (props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis : true,
		threshold         : 0,
		target            : window ? window() : undefined
	});

	return cloneElement(children, {
		elevation : trigger ? 4 : 0
	});
}

function FCAppBar (props) {
	const classes = useStyles();
	const [ anchorEl, setAnchorEl ] = useState(null);
	const { user, isAuthenticated, logout } = useAuth0();

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		logout();
	};

	const loggedInComponent = isAuthenticated ? (
		<div className={classes.userIconButton}>
			<IconButton aria-controls='menu-appbar' aria-haspopup='true' onClick={handleMenu} color='inherit'>
				<Avatar alt={user.email} src={user.picture} />
			</IconButton>
			<Menu
				id='menu-appbar'
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				keepMounted
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={Boolean(anchorEl)}
				onClose={handleClose}>
				<MenuItem onClick={handleClose}>{user.email}</MenuItem>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</div>
	) : null;

	return (
		<Fragment>
			<CssBaseline />
			<ElevationScroll {...props}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
							<Avatar
								alt='fcLogo'
								src={process.env.PUBLIC_URL + '/fcLogo.png'}
								className={classes.large}
							/>
						</IconButton>
						{/* <Typography variant="h6">FaangCracker</Typography> */}
						{loggedInComponent}
					</Toolbar>
				</AppBar>
			</ElevationScroll>
		</Fragment>
	);
}

export default FCAppBar;

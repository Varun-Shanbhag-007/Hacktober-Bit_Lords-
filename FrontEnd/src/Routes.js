import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Main from './components/screens/Main/Main';
import LoginWithEmail from './components/screens/LoginWithEmail';
import Homepage from './components/screens/Homepage';

function Routes (props) {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' render={(props) => <Login {...props} />} />
				<Route path='/main' render={(props) => <Main {...props} />} />
				<Route path='/loginWithEmail' render={(props) => <LoginWithEmail {...props} />} />
				<Route path='/homepage' render={(props) => <Homepage {...props} />} />
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;

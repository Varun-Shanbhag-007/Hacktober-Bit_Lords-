import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import FCAppBar from '../../FCAppBar/FCAppBar';
import { useAuth0 } from '@auth0/auth0-react';
import { isEmpty, get } from 'lodash';
import LoadingAnimationPopup from '../../Loader/loader';
import { FlexContainer, Container, Spacing } from '../../../styles/StylingComponents';
import { HeaderOne } from '../../../styles/Texts';
import MainRouterPage from './MainRouterPage';
import Cookie from 'js-cookie';

const Main = (props) => {
	const [ isLoading, setIsLoading ] = useState(true);
	const { isAuthenticated, user } = useAuth0();
	const [ typeFetched, settypeFetched ] = useState(false);
	const [ userType, setUserType ] = useState('');
	const [ userEmail, setEserEmail ] = useState('');

	// On load
	useEffect(
		() => {
			isAuthenticated && getUserType();
		},
		[ isAuthenticated ]
	);

	// Check for data fetch
	useEffect(
		() => {
			typeFetched && !isEmpty(userType) && setIsLoading(false);
		},
		[ typeFetched, userType ]
	);

	const getUserType = () => {
		axios({
			headers : {
				'Access-Control-Allow-Origin' : '*',
				'Content-Type'                : 'application/json'
			},
			method  : 'GET',
			mode    : 'cors',

			url     : `${process.env.REACT_APP_API_BASE_URL}/login/${user.email}`
		}).then(
			(response) => {
				const data = get(response, 'data') || {};
				setUserType(data.user_type);
				settypeFetched(true);
				setEserEmail(user.email);
				Cookie.set('userEmail', user.email);
				Cookie.set('userType', data.user_type);
			},
			(err) => {
				console.log('err', err);
			}
		);
	};

	if (isLoading) {
		return (
			<Fragment>
				<FCAppBar {...props} />
				<LoadingAnimationPopup showPopup={isLoading} />
			</Fragment>
		);
	}
	else {
		return (
			<Fragment>
				<FCAppBar {...props} />
				<MainRouterPage userType={userType} userEmail={userEmail} {...props} />
			</Fragment>
		);
	}
};

export default Main;

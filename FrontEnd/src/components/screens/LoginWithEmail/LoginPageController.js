import axios from 'axios';
import Cookie from 'js-cookie';
import { get } from 'lodash';
import React, { useEffect, useState, Fragment } from 'react';

import { LoginPageScreen } from './LoginPageScreen';

const LoginPageController = (props) => {
	// State Variables
	const [ error, setError ] = useState(false);
	const [ passwordError, setPasswordError ] = useState(error);
	const [ errorMessage, setErrorMessage ] = useState('Email/Phone and password do not match!');
	const [ emailOrCell, setEmailOrCell ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ allowLogin, setAllowLogin ] = useState(false);
	const [ highlightForm, setHighlightForm ] = useState(false);

	// Functions
	function formatPhoneNumber (phoneNumberString) {
		const x = phoneNumberString;
		const cleaned = `${x}`.replace(/\D/g, '');
		const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
		if (match) {
			return `+1 (${match[1]}) ${match[2]}-${match[3]}`;
		}
		return phoneNumberString;
	}

	const validateLogin = () => {
		if (emailOrCell.length > 0 && password.length > 0) {
			setAllowLogin(true);
			setError(false);
			setErrorMessage('Email/Phone and password do not match!');
			setHighlightForm(false);
		}
		else {
			setAllowLogin(false);
		}
	};

	function clean (phoneNumber) {
		let phNumb = phoneNumber;
		phNumb = phNumb.replace(/\s/g, '');
		phNumb = phNumb.replace(/[{()}]+/g, '');
		phNumb = phNumb.replace(/-/g, '');
		return phNumb;
	}

	const sendCode = () => {
		axios({
			method : 'post',
			url    : `${process.env.REACT_APP_API_BASE_URL}/auth/sendPhoneNumberVerificationCode`,
			data   : {
				accessToken : Cookie.get('accessToken')
			}
		}).then((response) => response && props.history.push('/phoneVerification'));
	};

	const login = () => {
		axios({
			method : 'post',
			url    : `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
			data   : {
				username : clean(emailOrCell),
				password
			}
		}).then(
			(response) => {
				const data = get(response.data, 'data') || {};

				const { userId } = data;
				const { transactionId } = data;
				const { accessToken } = data.authenticationResponse;
				const phVerified = get(data.authenticationResponse, 'phoneVerified') || false;
				Cookie.set('transactionId', transactionId);
				Cookie.set('accessToken', accessToken);
				Cookie.set('userId', userId);
				window.sessionStorage.setItem('loggedIn', 'true');
				window.sessionStorage.setItem('phoneVerified', phVerified);
				props.setLoggedIn(true);
				props.setPhoneVerified(phVerified);
				if (props.withinEmailVerification) {
					return props.history.push('/EmailVerification');
				}
				if (!data.authenticationResponse.phoneVerified) {
					return sendCode();
				}

				return props.history.push('/home');
			},
			(err) => {
				err && setError(true);
				setPasswordError(true);
				// eslint-disable-next-line no-restricted-globals
				if (isNaN(clean(emailOrCell))) {
					setErrorMessage('Email and password do not match.');
				}
				else {
					setErrorMessage('Mobile number and password do not match.');
				}
			}
		);
	};

	const forgotPassword = () => {
		if (emailOrCell.length === 0) {
			setErrorMessage('Please enter the email or phone number associated with your account.');
			setError(true);
			setPasswordError(false);
			setHighlightForm(true);
		}
		else if (emailOrCell.length > 0) {
			axios({
				method : 'post',
				url    : `${process.env.REACT_APP_API_BASE_URL}/auth/forgotPassword`,
				data   : {
					username : clean(emailOrCell)
				}
			}).then(
				(response) => {
					response &&
						props.history.push('/resetPassword', {
							username : clean(emailOrCell)
						});
				},
				(err) => {
					setError(true);
					setPasswordError(true);
					setHighlightForm(true);
					setErrorMessage('Your account was not found. Click "Create Account" to get started.');
				}
			);
		}
	};

	const handleBack = () => {
		props.history.push('/');
	};

	const handleKeyDown = (e) => {
		if (e === 'Enter') {
			login();
		}
	};

	useEffect(
		() => {
			setError(false);
			setHighlightForm(false);
			if (emailOrCell.length === 10) {
				setEmailOrCell(formatPhoneNumber(emailOrCell));
			}
			validateLogin();
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[ emailOrCell, password ]
	);

	return (
		<LoginPageScreen
			{...props}
			allowLogin={allowLogin}
			emailOrCell={emailOrCell}
			error={error}
			errorMessage={errorMessage}
			forgotPassword={forgotPassword}
			formatPhoneNumber={formatPhoneNumber}
			handleBack={handleBack}
			handleKeyDown={handleKeyDown}
			highlightForm={highlightForm}
			login={login}
			password={password}
			passwordError={passwordError}
			setEmailOrCell={setEmailOrCell}
			setPassword={setPassword}
		/>
	);
};

export { LoginPageController };

import axios from 'axios';
import Cookie from 'js-cookie';
import { get, isEmpty } from 'lodash';
import React, { useEffect, useState, Fragment } from 'react';

import Loader from '../../Loader/loader';

import { OrgFormOne } from './OrgFormOne';
import { OrgFormTwo } from './OrgFormTwo';
import { OrgFormThree } from './OrgFormThree';
import { OrgFormFour } from './OrgFormFour';
import { OrgFormFive } from './OrgFormFive';
import { OrgFormSix } from './OrgFormSix';

const HomepageController = (props) => {
	// Page One Controls
	const [ isLoading, setIsLoading ] = useState(true);
	const [ isAllFilled, setIsAllFilled ] = useState(false);
	const [ showPage, setShowPage ] = useState(1);
	const [ orgName, setOrgName ] = useState('');
	const userEmailId = Cookie.get('userEmail');
	const [ orgStreetAddress, setOrgStreetAddress ] = useState('');
	const [ zipCode, setZipCode ] = useState('');
	const [ orgStateName, setOrgStateName ] = useState('');
	const [ orgCityName, setOrgCityName ] = useState('');
	const [ isZipError, setIsZipError ] = useState(false);
	const [ zipErrorMessage, setZipErrorMessage ] = useState('');
	const [ OrgWebsite, setOrgWebsite ] = useState('');
	const [ websiteError, setWebsiteError ] = useState([ false, '' ]);
	const [ orgEmail, setOrgEmail ] = useState('');
	const [ emailError, setEmailError ] = useState([ false, '' ]);
	const [ orgFax, setOrgFax ] = useState('');

	// orgStreetAddress, zipCode, orgStateName, orgCityName, OrgWebsite, orgEmail, orgFax
	const [ completeData, setCompleteData ] = useState({});

	useEffect(
		() => {
			validateAllFields();
		},
		[ orgName, orgStreetAddress, isZipError, orgStateName, orgCityName, OrgWebsite, websiteError, emailError ]
	);
	const validateAllFields = () => {
		!isEmpty(orgName) &&
			!isEmpty(orgStreetAddress) &&
			!isZipError &&
			!isEmpty(orgStateName) &&
			!isEmpty(orgCityName) &&
			!isEmpty(OrgWebsite) &&
			!websiteError[0] &&
			!emailError[0] &&
			setIsAllFilled(true);
	};

	const zipError = (value) => {
		let regex = /^[a-zA-Z]+$/;
		if (value == 'check' && zipCode.match(regex)) {
			setIsZipError(true);
			setZipErrorMessage('Zipcode must be a number.');
		}
		else if (value == 'check' && zipCode.length !== 5) {
			setIsZipError(true);
			setZipErrorMessage('Please Enter a Valid 5 digit Zip.');
		}
		else {
			setIsZipError(false);
			setZipErrorMessage('');
		}
	};

	const validateAndFetchZip = () => {
		axios({
			headers : {
				'Access-Control-Allow-Origin' : '*',
				'Content-Type'                : 'application/json'
			},
			method  : 'GET',
			mode    : 'cors',

			url     : `${process.env.REACT_APP_API_BASE_URL}/zip/${zipCode}`
		}).then(
			(response) => {
				const data = get(response, 'data') || {};
				console.log('data', data);
				setOrgCityName(data.city);
				setOrgStateName(data.state);
			},
			(err) => {
				console.log('err', err);
				setOrgCityName('P : Chicago');
				setOrgStateName('P : IL');
			}
		);
	};

	function validURL (str) {
		var pattern = new RegExp(
			// '^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
				'(\\#[-a-z\\d_]*)?$',
			'i'
		); // fragment locator
		return !!pattern.test(str);
	}

	const validateWebsite = (val) => {
		if (val == 'setNull') {
			setWebsiteError([ false, '' ]);
		}
		else if (val == 'validate' && !validURL(OrgWebsite)) {
			setWebsiteError([ true, 'Please Enter a valid Website URL.' ]);
		}
	};

	const validateEmail = (val) => {
		if (val == 'setNull') {
			setEmailError([ false, '' ]);
		}
		else {
			const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (isEmpty(orgEmail) || !re.test(String(orgEmail).toLowerCase())) {
				setEmailError([ true, 'Pleae enter a valid email' ]);
			}
		}
	};

	// Page Two Controls
	const [ isAllFilledPageTwo, setIsAllFilledPageTwo ] = useState(false);
	const [ pocName, setPocName ] = useState('');
	const [ pocTitle, setPocTitle ] = useState('');
	const [ pocEmail, setPocEmail ] = useState('');
	const [ pocEmailError, setPocEmailError ] = useState([ false, '' ]);
	const [ pocPhone, setPocPhone ] = useState('');
	const [ pocPhoneError, setPocPhoneError ] = useState([ false, '' ]);
	const [ offTime, setOffTime ] = useState({ start: '', end: '' });

	// pocName, pocTitle, pocEmailError, pocPhoneError

	const validatePocEmail = (val) => {
		if (val == 'setNull') {
			setPocEmailError([ false, '' ]);
		}
		else {
			const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (isEmpty(pocEmail) || !re.test(String(pocEmail).toLowerCase())) {
				setPocEmailError([ true, 'Pleae enter a valid email' ]);
			}
		}
	};

	const validatePocPhone = (val) => {
		if (val == 'setNull') {
			return setPocPhoneError([ false, '' ]);
		}
		var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
		var digits = pocPhone.replace(/\D/g, '');
		if (!phoneRe.test(digits)) {
			setPocPhoneError([ true, 'Pleae enter a valid 10 Digit mobile number without +1.' ]);
		}
	};

	const validateAllFieldsPageTwo = () => {
		!isEmpty(pocName) &&
			!isEmpty(pocTitle) &&
			!isEmpty(pocEmail) &&
			!pocEmailError[0] &&
			!isEmpty(pocPhone) &&
			!pocPhoneError[0] &&
			setIsAllFilledPageTwo(true);
	};

	// Page Three Controls
	const [ tags, setTags ] = useState('');
	const [ userDataFetched, setUserDataFetched ] = useState(false);
	const [ existingData, setExistingData ] = useState({});

	useEffect(() => {
		getUserData();
	}, []);

	useEffect(
		() => {
			if (userDataFetched) {
				fillUpExistingData();
			}
		},
		[ userDataFetched ]
	);

	const fillUpExistingData = () => {
		if (!isEmpty(existingData)) {
			setOrgName(existingData.org_name);
			setOrgStreetAddress(existingData.org_street_address);
			setZipCode(existingData.org_zip);
			setOrgStateName(existingData.org_state);
			setOrgCityName(existingData.org_city);
			setOrgWebsite(existingData.org_site);
			setOrgEmail(existingData.org_mail);
			setOrgFax(existingData.org_fax);
			// setPocName()
			// setPocTitle()
			// setPocEmail()
			// setPocPhone()
			// setOffTime()
		}

		return setIsLoading(false);
	};

	console.log('offTime', offTime);
	// console.log('orgName', orgName);

	const getUserData = () => {
		axios({
			headers : {
				'Access-Control-Allow-Origin' : '*',
				'Content-Type'                : 'application/json'
			},
			method  : 'GET',
			mode    : 'cors',
			data    : completeData,
			url     : `${process.env.REACT_APP_API_BASE_URL}/org/getOrg/${userEmailId}`
		}).then(
			(response) => {
				console.log('responsexxx', response.data, userDataFetched);
				setExistingData(response.data);
				setUserDataFetched(true);
			},
			(err) => {
				console.log('err', err);
			}
		);
	};

	// Post Data
	const validateAndPostData = () => {
		axios({
			headers : {
				'Access-Control-Allow-Origin' : '*',
				'Content-Type'                : 'application/json'
			},
			method  : 'POST',
			mode    : 'cors',
			data    : completeData,
			url     : `${process.env.REACT_APP_API_BASE_URL}/org/addOrgData`
		}).then(
			(response) => {
				console.log('response', response);
			},
			(err) => {
				console.log('err', err);
			}
		);
	};

	useEffect(
		() => {
			if (!isEmpty(completeData.particaption_list)) {
				validateAndPostData();
				return props.history.push('./main');
			}
		},
		[ completeData ]
	);

	const continueHandler = (pageNum, content) => {
		// console.log('content', content);

		let data = {};
		switch (pageNum) {
			case 1:
				data = {
					org_name           : orgName,
					org_key            : userEmailId,
					org_street_address : orgStreetAddress,
					org_zip            : zipCode,
					org_state          : orgStateName,
					org_city           : orgCityName,
					org_site           : OrgWebsite,
					org_mail           : orgEmail,
					org_fax            : orgFax
				};
				break;

			case 2:
				data = {
					poc_name     : pocName,
					poc_title    : pocTitle,
					poc_email    : pocEmail,
					poc_ph_no    : pocPhone,
					off_days     : content[0],
					off_isonline : content[1].value,
					off_time     : { start: content[2].value, end: content[3].value }
				};
				break;

			case 3:
				data = {
					...content
				};
				break;

			case 4:
				data = {
					...content
				};
				break;

			case 5:
				data = {
					...content
				};
				break;

			case 6:
				data = {
					...content
				};
				break;
		}

		setCompleteData({ ...completeData, ...data });
		return setShowPage(pageNum + 1);
	};

	console.log('All content', completeData);
	// console.log('userEmail', Cookie.get('userEmail'));

	// Screen Returns
	switch (showPage) {
		case 1:
			return (
				<OrgFormOne
					isLoading={isLoading}
					isAllFilled={isAllFilled}
					validateAllFields={validateAllFields}
					orgName={orgName}
					setOrgName={setOrgName}
					orgStreetAddress={orgStreetAddress}
					setOrgStreetAddress={setOrgStreetAddress}
					zipCode={zipCode}
					setZipCode={setZipCode}
					orgStateName={orgStateName}
					setOrgStateName={setOrgStateName}
					orgCityName={orgCityName}
					setOrgCityName={setOrgCityName}
					zipError={zipError}
					isZipError={isZipError}
					zipErrorMessage={zipErrorMessage}
					validateAndFetchZip={validateAndFetchZip}
					OrgWebsite={OrgWebsite}
					setOrgWebsite={setOrgWebsite}
					websiteError={websiteError}
					validateWebsite={validateWebsite}
					orgEmail={orgEmail}
					setOrgEmail={setOrgEmail}
					emailError={emailError}
					validateEmail={validateEmail}
					orgFax={orgFax}
					setOrgFax={setOrgFax}
					continueHandler={continueHandler}
				/>
			);

		case 2:
			console.log('I Am Her!');
			return (
				<OrgFormTwo
					isAllFilledPageTwo={isAllFilledPageTwo}
					validateAllFieldsPageTwo={validateAllFieldsPageTwo}
					pocName={pocName}
					setPocName={setPocName}
					pocTitle={pocTitle}
					setPocTitle={setPocTitle}
					pocEmail={pocEmail}
					setPocEmail={setPocEmail}
					validatePocEmail={validatePocEmail}
					pocEmailError={pocEmailError}
					pocPhone={pocPhone}
					setPocPhone={setPocPhone}
					pocPhoneError={pocPhoneError}
					validatePocPhone={validatePocPhone}
					offTime={offTime}
					setOffTime={setOffTime}
					continueHandler={continueHandler}
					existingData={existingData}
				/>
			);
		case 3:
			return <OrgFormThree continueHandler={continueHandler} tags={tags} setTags={setTags} />;

		case 4:
			return <OrgFormFour continueHandler={continueHandler} />;

		case 5:
			return <OrgFormFive continueHandler={continueHandler} />;
		case 6:
			return <OrgFormSix continueHandler={continueHandler} />;
		default:
			console.log('default showPage', showPage);
			break;
	}
};

export { HomepageController };

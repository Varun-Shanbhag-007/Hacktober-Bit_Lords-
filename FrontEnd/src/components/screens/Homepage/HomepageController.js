import axios from 'axios';
import Cookie from 'js-cookie';
import { get, isEmpty } from 'lodash';
import React, { useEffect, useState, Fragment } from 'react';

import { HomepageScreen } from './HomepageScreen';
import Loader from '../../Loader/loader';

const HomepageController = (props) => {
	const [ isLoading, setIsLoading ] = useState(!true);
	const [ isAllFilled, setIsAllFilled ] = useState(false);
	const [ orgStreetAddress, setOrgStreetAddress ] = useState('');
	const [ zipCode, setZipCode ] = useState('');
	const [ orgStateName, setOrgStateName ] = useState('');
	const [ orgCityName, setOrgCityName ] = useState('');
	const [ isZipError, setIsZipError ] = useState(false);
	const [ zipErrorMessage, setZipErrorMessage ] = useState('');
	const [ OrgWebsite, setOrgWebsite ] = useState('');
	const [ websiteError, setWebsiteError ] = useState([ false, '' ]);

	const validateAllFields = () => {
		!isEmpty(orgStreetAddress) &&
			!isEmpty(zipCode) &&
			!isEmpty(orgStateName) &&
			!isEmpty(orgCityName) &&
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
			setZipErrorMessage('Please Enter a Valid 6 digit Zip.');
		}
		else {
			setIsZipError(false);
			setZipErrorMessage('');
		}
	};

	const validateAndFetchZip = () => {
		axios({
			method : 'post',
			url    : `${process.env.REACT_APP_API_BASE_URL}/locate_using_zipcode?zipcode=${zipCode}`
		}).then(
			(response) => {
				console.log('response', response);
			},
			(err) => {}
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

	return (
		<HomepageScreen
			isLoading={isLoading}
			isAllFilled={isAllFilled}
			validateAllFields={validateAllFields}
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
		/>
	);
};

export { HomepageController };

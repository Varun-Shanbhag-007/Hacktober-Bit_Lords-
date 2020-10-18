import axios from 'axios';
import Cookie from 'js-cookie';
import { get, isEmpty } from 'lodash';
import React, { useEffect, useState, Fragment } from 'react';

import Loader from '../../Loader/loader';

import HelpVeteransScreen from './HelpVeteransScreen';

const HelpVeteransController = (props) => {
	// Page One Controls
	const [ isLoading, setIsLoading ] = useState(!true);
	const [ zipcode, setZipcode ] = useState('60616');
	const [ isZipError, setIsZipError ] = useState(false);
	const [ zipErrorMessage, setZipErrorMessage ] = useState('');
	const [ selectedcategory, setSelectedcategory ] = useState();

    
    
	const [ searchKey, setSearchKey ] = useState('');

	const validateZipCode = (task, zip) => {
		if (isEmpty(zip)) {
			return;
		}
		let regex = /^[a-zA-Z]+$/;
		if (task == 'check' && zip.match(regex)) {
			setIsZipError(true);
			setZipErrorMessage('Zipcode must be a number.');
		}
		else if (task == 'check' && zip.length !== 5) {
			setIsZipError(true);
			setZipErrorMessage('Please Enter a Valid 5 digit Zip.');
		}
		else {
			setIsZipError(false);
			setZipErrorMessage('');
		}
	};

	const validateSearch = () => {};

	// Screen Returns
	return (
		<HelpVeteransScreen
			zipcode={zipcode}
			setZipcode={setZipcode}
			isZipError={isZipError}
			zipErrorMessage={zipErrorMessage}
			validateZipCode={validateZipCode}
			searchKey={searchKey}
			setSearchKey={setSearchKey}
			validateSearch={validateSearch}
			selectedcategory={selectedcategory}
			setSelectedcategory={setSelectedcategory}
		/>
	);
};

export { HelpVeteransController };

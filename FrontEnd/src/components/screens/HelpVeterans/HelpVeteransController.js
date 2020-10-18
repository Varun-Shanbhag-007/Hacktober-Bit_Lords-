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

	const [ originalData, setOriginalData ] = useState({});
	const [ allData, setAllData ] = useState([]);
	const [ allDataFetched, setallDataFetched ] = useState(false);
	const [ filters, setFilters ] = useState([]);

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

	const getOrgData = () => {
		axios({
			headers : {
				'Access-Control-Allow-Origin' : '*',
				'Content-Type'                : 'application/json'
			},
			method  : 'POST',
			mode    : 'cors',
			data    : { org_zip: '60616', custom_string: '', program_category: [] },
			url     : `${process.env.REACT_APP_API_BASE_URL}/org/getNearbyOrg`
		}).then(
			(response) => {
				const jsonObj = response.data.data;
				setOriginalData(jsonObj);
				ProcessData();
				setallDataFetched(true);
			},
			(err) => {
				console.log('err', err);
			}
		);
	};

	const ProcessData = () => {
		console.log('Inside ProcessData');
	};

	useEffect(() => {
		getOrgData();
	}, []);

	useEffect(
		() => {
			if (isEmpty(setFilters) && allDataFetched) {
				setAllData(originalData);
			}
			else {
				ProcessData();
			}
		},
		[ allDataFetched, originalData, filters ]
	);

	const FilterHandler = (values) => {
		setFilters(values);
	};

	const validateSearch = () => {
		// setIsLoading(true);
	};

	const validateSearchQuery = () => {
		setIsLoading(true);

		Object.keys(filters).forEach((filter, idx) => {
			switch (filter) {
				case 'radiusFilter':
					const data = originalData.filter((each, idx) => {
						return each.distance <= filters.radiusFilter;
					});
					setAllData(data);
					console.log('I  Am Here!', filters.radiusFilter, data);
					setIsLoading(false);
					break;
			}
		});
	};

	// Screen Returns
	return (
		<HelpVeteransScreen
			isLoading={isLoading}
			zipcode={zipcode}
			setZipcode={setZipcode}
			isZipError={isZipError}
			zipErrorMessage={zipErrorMessage}
			validateZipCode={validateZipCode}
			searchKey={searchKey}
			setSearchKey={setSearchKey}
			validateSearch={validateSearch}
			validateSearchQuery={validateSearchQuery}
			selectedcategory={selectedcategory}
			setSelectedcategory={setSelectedcategory}
			allData={allData}
			allDataFetched={allDataFetched}
			filters={filters}
			FilterHandler={FilterHandler}
			validateSearch={validateSearch}
		/>
	);
};

export { HelpVeteransController };

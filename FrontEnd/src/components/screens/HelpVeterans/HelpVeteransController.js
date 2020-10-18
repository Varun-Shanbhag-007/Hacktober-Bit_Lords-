import axios from 'axios';
import Cookie from 'js-cookie';
import { get, isEmpty } from 'lodash';
import React, { useEffect, useState, Fragment } from 'react';

import Loader from '../../Loader/loader';

import HelpVeteransScreen from './HelpVeteransScreen';

const HelpVeteransController = (props) => {
	// Page One Controls
	const [ isLoading, setIsLoading ] = useState(false);
	const [ zipcode, setZipcode ] = useState();
	const [ isZipError, setIsZipError ] = useState(false);
	const [ zipErrorMessage, setZipErrorMessage ] = useState('');
	const [ selectedcategory, setSelectedcategory ] = useState();

	const [ searchKey, setSearchKey ] = useState('');

	const [ originalData, setOriginalData ] = useState({});
	const [ allData, setAllData ] = useState([]);
	const [ allDataFetched, setallDataFetched ] = useState(false);
	const [ filters, setFilters ] = useState([]);
	const [ ApiCall, setApiCall ] = useState(true);

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
			data    : { org_zip: '60616', custom_string: searchKey, program_category: selectedcategory },
			url     : `${process.env.REACT_APP_API_BASE_URL}/org/getNearbyOrg`
		}).then(
			(response) => {
				const jsonObj = response.data.data;
				setOriginalData(jsonObj);
				ProcessData();
				setallDataFetched(true);
				setApiCall(false);
			},
			(err) => {
				console.log('err', err);
			}
		);
	};

	const ProcessData = () => {};

	useEffect(
		() => {
			if (isEmpty(setFilters) && allDataFetched) {
				setAllData(originalData);
			}
			else {
				ProcessData();
			}
			// setIsLoading(false);
		},
		[ allDataFetched, originalData, filters ]
	);

	const FilterHandler = (values) => {
		setFilters({ ...filters, ...values });
	};

	const validateSearch = () => {
		// setIsLoading(true);
	};

	const filterAllData = () => {
		let data = originalData;
		let newData = [];
		Object.keys(filters).forEach((filter, idx) => {
			switch (filter) {
				case 'radiusFilter':
					if (!isEmpty(data)) {
						newData = data.filter((each, idx) => {
							return each.distance <= filters.radiusFilter;
						});
					}

					break;

				case 'addFamilyFilter':
					if (!isEmpty(originalData)) {
						newData = data.filter((each, idx) => {
							return each.is_additional_family_allowed == 'Yes';
						});
					}

					break;

				case 'disabilityfilter':
					if (!isEmpty(originalData)) {
						newData = data.filter((each, idx) => {
							return each.is_disability_req == 'Yes';
						});
					}

					break;

				case 'militaryFilter':
					if (!isEmpty(originalData)) {
						newData = data.filter((each, idx) => {
							return each.military_status.includes(filters.militaryFilter);
						});
					}

					break;
			}
			setAllData(newData);
		});

		// setIsLoading(false);
	};

	const validateSearchQuery = (value) => {
		setIsLoading(true);
		if (value) {
			getOrgData();
		}
		filterAllData();
		// setIsLoading(false);
	};

	useEffect(
		() => {
			setIsLoading(false);
		},
		[ allData ]
	);

	useEffect(
		() => {
			setApiCall(true);
		},
		[ zipcode, searchKey, selectedcategory ]
	);

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
			setFilters={setFilters}
			FilterHandler={FilterHandler}
			validateSearch={validateSearch}
			setApiCall={setApiCall}
			ApiCall={ApiCall}
			setIsLoading={setIsLoading}
		/>
	);
};

export { HelpVeteransController };

import axios from 'axios';
import Cookie from 'js-cookie';
import { get, isEmpty } from 'lodash';
import React, { useEffect, useState, Fragment } from 'react';

import { HomepageScreen } from './HomepageScreen';

const HomepageController = (props) => {
    const [ orgStreetAddress, setOrgStreetAddress ] = useState('');
    const [ orgStateName, setOrgStateName ] = useState('');


	const allFilled = () => {
		return true;
	};

	

	return (
		<HomepageScreen
			allFilled={allFilled}
			orgStreetAddress={orgStreetAddress}
            setOrgStreetAddress={setOrgStreetAddress}
            orgStateName={orgStateName}
            setOrgStateName={setOrgStateName}
		/>
	);
};

export { HomepageController };

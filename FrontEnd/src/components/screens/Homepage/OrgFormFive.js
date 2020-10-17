import { HeaderOne, HeaderTwo, Description, Note, HeaderThree } from '../../../styles/Texts';
import { Colors } from '../../../styles/Colors';
import { FlexContainer, Container, Spacing } from '../../../styles/StylingComponents';
import { Button } from '../../../styles/Button';
import { get, isEmpty } from 'lodash';
import { FormInput, FormPasswordInput, FormDropdown } from '../../../styles/Forms';
import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import FCAppBar from '../../FCAppBar/FCAppBar';
import LoadingAnimationPopup from '../../Loader/loader';

const StyledForm = styled.div`
	@media (max-width: 768px) {
		margin: 0px 0px 18px 0px;
	}

	@media (min-width: 768px) {
		margin: 0px 0px 27px 0px;
	}
`;

const ButtonContainerX = styled.div`
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 176px;

	display: flex;
	justify-content: center;
	align-items: center;

	background: linear-gradient(0deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);

	@media (max-width: 768px) {
		height: 120px;
	}
`;

const CheckBoxes = ({ header, names, selected, setSelected, props }) => {
	const selectedHandler = (val) => {
		console.log('val', val);
		let values = [];
		if (selected.includes(val)) {
			values = selected.filter((curr, idx) => curr !== val);
		}
		else {
			values = [ ...selected, val ];
		}
		setSelected(values);
	};
	return (
		<Container>
			<FlexContainer marginBottom={'30px'}>
				<HeaderThree text={header} bold />
			</FlexContainer>

			<FlexContainer
				mobileWidth={'266px'}
				width={'600px'}
				paddingLeft={'50px'}
				flexDirection='column'
				justifyContent='flex-start'
				alignItems='flex-start'>
				{names.map((val, idx) => (
					<FlexContainer minWidth={'100px'} justifyContent='center' alignItems='center' key={idx}>
						<input
							type='checkbox'
							{...props}
							onClick={() => selectedHandler(val)}
							style={{ padding: '20px', transform: 'scale(1.5)' }}
						/>
						<Container width={'20px'} />
						<Note text={<p>{val}</p>} />
					</FlexContainer>
				))}
			</FlexContainer>
		</Container>
	);
};

const OrgFormFive = ({
	tags,
	setTags,

	isLoading,
	validateAllFieldsPageThree,
	isAllFilledPageThree,
	pocName,
	setPocName,
	pocTitle,
	setPocTitle,
	pocEmail,
	setPocEmail,
	pocEmailError,
	validatePocEmail,
	offTime,
	setOffTime,
	continueHandler,
	pocPhone,
	setPocPhone,
	pocPhoneError,
	validatePocPhone,
	checkboxOpions = [
		'Active Duty',
		'Guard/Reserve',
		'Veteran',
		'Retired',
		'Family & Children',
		'Caregivers & Survivors'
	],
	serveOptions = [ 'Honorable', 'General', 'Other Than Honorable', 'Bad Conduct', 'Dishonorable' ],
	checkboxHeader = 'What military discharge status do you serve? (Check all that apply) *',

	checkboxOpionsServiceEras = [ 'WWII', 'Korea', 'Vietnam', 'Gulf War', 'Post 9/11', 'Peacetime' ],
	specializedMedServices = [
		'Physical Rehab',
		'PTSD Support',
		'Traumatic Brain Injury (TBI)',
		'Spinal Cord Injury (SCI)',
		'None'
	],
	isOnline = [ 'Yes', 'No' ],
	isOnlineCheckboxHeader = 'Have Online Operation',

	...props
}) => {
	const [ pageNum, setpageNum ] = useState(1);
	const [ requireDD, setRequireDD ] = useState({});
	const [ requireDisability, setRequireDisability ] = useState({});
	const [ requireGeo, setRequireGeo ] = useState();
	const [ emergencyAssistance, setEmergencyAssistance ] = useState('');
	const [ isAllSelected, setisAllSelected ] = useState(false);

	const pageSelectionHandler = () => {
		switch (pageNum) {
			case 1:
				continueHandler(5, {
					is_dd_214            : requireDD.label,
					fin_assistance_limit : emergencyAssistance,
					is_disability_req    : requireDisability.label,
					program_req_geo_area : requireGeo.label
				});
				break;

			default:
				break;
		}

		if (pageNum < 2) {
			setpageNum(pageNum + 1);
			return false;
		}
		return true;
	};

	// console.log('allSelected', requireDD.label, requireDisability, requireGeo, emergencyAssistance);

	useEffect(() => {
		if (
			!isEmpty(requireDD) &&
			!isEmpty(requireDisability) &&
			!isEmpty(requireGeo) &&
			!isEmpty(emergencyAssistance)
		) {
			setisAllSelected(true);
		}
		else setisAllSelected(false);
	});

	return (
		<Container width={'100vw'} paddingTop={'70px'} paddingBottom={'180px'} paddingLeft={'10%'} paddingRight={'10%'}>
			<FCAppBar {...props} />

			<FlexContainer flexDirection='column' alignItems='center' marginTop={'0px'} width={'100%'}>
				<LoadingAnimationPopup showPopup={isLoading} />

				<HeaderOne text={<p>Assistance Information</p>} color={Colors.darkBlack} bold />

				<Spacing space={'50px'} mobileSpace={'50px'} />
				<FlexContainer
					mobileWidth={'266px'}
					width={'600px'}
					flexDirection='row'
					justifyContent='space-between'
					alignItems='space-between'>
					<FormDropdown
						title={'Does your organization require a DD-214?'}
						value={requireDD}
						options={[ { value: 'requireDD', label: 'Yes' }, { value: 'requireDD', label: 'No' } ]}
						onChange={setRequireDD}
						required={true}
					/>
				</FlexContainer>

				<Spacing space={'50px'} mobileSpace={'50px'} />
				<FlexContainer
					mobileWidth={'266px'}
					width={'600px'}
					flexDirection='row'
					justifyContent='space-between'
					alignItems='space-between'>
					<FormDropdown
						title={'Is disability a requirement to be part of this program?'}
						value={requireDisability}
						options={[
							{ value: 'requireDisability', label: 'Yes' },
							{ value: 'requireDisability', label: 'No' }
						]}
						onChange={setRequireDisability}
						required={true}
					/>
				</FlexContainer>

				<Spacing space={'50px'} mobileSpace={'50px'} />
				<FlexContainer
					mobileWidth={'266px'}
					width={'600px'}
					flexDirection='row'
					justifyContent='space-between'
					alignItems='space-between'>
					<FormDropdown
						title={
							'Do clients have to reside in a certain geographic area or county to be eligible for this program? (If yes, please list.)'
						}
						value={requireGeo}
						options={[ { value: 'requireGeo', label: 'Yes' }, { value: 'requireGeo', label: 'No' } ]}
						onChange={setRequireGeo}
						required={true}
					/>
				</FlexContainer>

				{/* What is your limit for emergency financial assistance? (N/A if it does not apply) */}
				<FlexContainer flexDirection={'column'} mobileWidth={'266px'} width={'600px'}>
					<Spacing space={'50px'} mobileSpace={'50px'} />
					<StyledForm>
						<FormInput
							cancellable={!isEmpty(emergencyAssistance)}
							// error={isEmpty(emergencyAssistance)}
							onChange={setEmergencyAssistance}
							title={'What is your limit for emergency financial assistance? (N/A if it does not apply)'}
							value={emergencyAssistance}
							required={true}
						/>
					</StyledForm>
				</FlexContainer>

				{(isAllFilledPageThree || isAllSelected) && (
					<ButtonContainerX>
						<Button active onClick={pageSelectionHandler} text={'Continue'} />
					</ButtonContainerX>
				)}
			</FlexContainer>
		</Container>
	);
};

export { OrgFormFive };

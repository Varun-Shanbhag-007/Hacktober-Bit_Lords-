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
							checked={!isEmpty(selected) && selected.includes(val)}
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

const days = [
	{ value: '1', label: '1' },
	{ value: '2', label: '2' },
	{ value: '3', label: '3' },
	{ value: '4', label: '4' },
	{ value: '5', label: '5' },
	{ value: '6', label: '6' }
];

const weeks = [
	{ value: '1', label: '1' },
	{ value: '2', label: '2' },
	{ value: '3', label: '3' },
	{ value: '4', label: '4' }
];

const OrgFormSix = ({
	tags,
	setTags,
	existingData,
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
	const [ requireAdditionalFamily, setRequireAdditionalFamily ] = useState({});
	const [ isSubscribed, setIsSubscribed ] = useState({});
	const [ participations, setParticipations ] = useState();
	const [ emergencyAssistance, setEmergencyAssistance ] = useState('');
	const [ isAllSelected, setisAllSelected ] = useState(false);

	const [ daysSelected, setDaysSelected ] = useState({});
	const [ weeksSelected, setWeeksSelected ] = useState({});

	const pageSelectionHandler = () => {
		switch (pageNum) {
			case 1:
				continueHandler(5, {
					is_additional_family_allowed : requireAdditionalFamily.label,
					is_subscribed                : isSubscribed.label,
					fin_assistance_turn_around   : { days: daysSelected.value || '', weeks: weeksSelected.value || '' },
					particaption_list            : participations
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

	useEffect(
		() => {
			if (!isEmpty(existingData)) {
				setIsSubscribed({
					value : 'isSubscribed',
					label : existingData.is_subscribed
				});

				setRequireAdditionalFamily({
					value : 'requireAdditionalFamily',
					label : existingData.is_additional_family_allowed
				});
				setParticipations(existingData.particaption_list);
			}
		},
		[ existingData ]
	);

	useEffect(() => {
		if (
			!isEmpty(requireAdditionalFamily) &&
			!isEmpty(isSubscribed) &&
			!isEmpty(participations) &&
			(!isEmpty(daysSelected.value) || !isEmpty(weeksSelected.value))
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

				<HeaderTwo text={<p>Additional Information</p>} color={Colors.darkBlack} bold />

				<Spacing space={'50px'} mobileSpace={'50px'} />
				<FlexContainer
					mobileWidth={'266px'}
					width={'600px'}
					flexDirection='row'
					justifyContent='space-between'
					alignItems='space-between'>
					<FormDropdown
						title={'Are additional family or household members eligible for this program?'}
						value={
							!isEmpty(requireAdditionalFamily) ? (
								requireAdditionalFamily
							) : (
								{
									value : 'requireAdditionalFamily',
									label : existingData.is_additional_family_allowed
								}
							)
						}
						options={[
							{ value: 'requireAdditionalFamily', label: 'Yes' },
							{ value: 'requireAdditionalFamily', label: 'No' }
						]}
						onChange={setRequireAdditionalFamily}
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
						title={'I would like to receive more information on partnering with Illinois Joining Forces.'}
						value={
							!isEmpty(isSubscribed) ? (
								isSubscribed
							) : (
								{
									value : 'isSubscribed',
									label : existingData.is_subscribed
								}
							)
						}
						options={[ { value: 'isSubscribed', label: 'Yes' }, { value: 'isSubscribed', label: 'No' } ]}
						onChange={setIsSubscribed}
						required={true}
					/>
				</FlexContainer>

				<Spacing space={'50px'} mobileSpace={'50px'} />

				<FlexContainer flexDirection={'column'} mobileWidth={'266px'} width={'600px'}>
					<Spacing space={'50px'} mobileSpace={'50px'} />
					<StyledForm>
						<FormInput
							cancellable={!isEmpty(participations)}
							onChange={setParticipations}
							title={
								'Do you participate in an IJF Veteran Support Community or other local collaborative? (If yes, please list name and location.)'
							}
							value={participations || existingData.particaption_list}
							required={true}
						/>
					</StyledForm>
				</FlexContainer>

				<Spacing space={'50px'} mobileSpace={'50px'} />

				<FlexContainer
					mobileWidth={'266px'}
					width={'600px'}
					flexDirection='row'
					justifyContent='space-between'
					alignItems='space-between'>
					<Note
						text={<p>What is your limit for emergency financial assistance? (N/A if it does not apply)</p>}
						color={Colors.darkBlack}
						bold
					/>
					<Container width={'210px'} mobileWidth={'120px'}>
						<FormDropdown
							title={'Days'}
							value={daysSelected}
							options={days}
							onChange={setDaysSelected}
							required={true}
						/>
					</Container>
					<Container width={'210px'} mobileWidth={'120px'}>
						<FormDropdown
							title={'Weeks'}
							value={weeksSelected}
							options={weeks}
							onChange={setWeeksSelected}
							required={true}
						/>
					</Container>
				</FlexContainer>

				{(!isEmpty(existingData) || (isAllFilledPageThree || isAllSelected)) && (
					<ButtonContainerX>
						<Button active onClick={pageSelectionHandler} text={'Continue'} />
					</ButtonContainerX>
				)}
			</FlexContainer>
		</Container>
	);
};

export { OrgFormSix };

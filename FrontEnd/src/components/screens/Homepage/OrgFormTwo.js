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
	width: 40%;
	height: 176px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	background: linear-gradient(0deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);

	@media (max-width: 768px) {
		height: 120px;
	}
`;

const CheckBoxes = ({ header, names, selected, setSelected, props }) => {
	const selectedHandler = (val) => {
		let values = [];
		if (isEmpty(selected)) {
			selected = [];
		}
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
				flexDirection='row'
				justifyContent='space-between'
				alignItems='space-between'>
				{names.map((val, idx) => (
					<Container minWidth={'100px'}>
						<input
							checked={!isEmpty(selected) && selected.includes(val)}
							type='checkbox'
							{...props}
							onClick={() => selectedHandler(val)}
							style={{ padding: '20px', transform: 'scale(1.5)' }}
						/>
						<Container width={'20px'} />
						<Note text={<p>{val}</p>} />
					</Container>
				))}
			</FlexContainer>
		</Container>
	);
};

const time = [
	{ value: '12:00 AM', label: '12:00 AM' },
	{ value: '01:00 AM', label: '01:00 AM' },
	{ value: '02:00 AM', label: '02:00 AM' },
	{ value: '03:00 AM', label: '03:00 AM' },
	{ value: '04:00 AM', label: '04:00 AM' },
	{ value: '05:00 AM', label: '05:00 AM' },
	{ value: '06:00 AM', label: '06:00 AM' },
	{ value: '07:00 AM', label: '07:00 AM' },
	{ value: '08:00 AM', label: '08:00 AM' },
	{ value: '09:00 AM', label: '09:00 AM' },
	{ value: '10:00 AM', label: '10:00 AM' },
	{ value: '11:00 AM', label: '11:00 AM' },
	{ value: '12:00 PM', label: '12:00 PM' },
	{ value: '01:00 PM', label: '01:00 PM' },
	{ value: '02:00 PM', label: '02:00 PM' },
	{ value: '03:00 PM', label: '03:00 PM' },
	{ value: '04:00 PM', label: '04:00 PM' },
	{ value: '05:00 PM', label: '05:00 PM' },
	{ value: '06:00 PM', label: '06:00 PM' },
	{ value: '07:00 PM', label: '07:00 PM' },
	{ value: '08:00 PM', label: '08:00 PM' },
	{ value: '09:00 PM', label: '09:00 PM' },
	{ value: '10:00 PM', label: '10:00 PM' },
	{ value: '11:00 PM', label: '11:00 PM' }
];

const OrgFormTwo = ({
	isLoading,
	validateAllFieldsPageTwo,
	isAllFilledPageTwo,
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
	existingData,
	backHandler,
	checkboxOpions = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ],
	checkboxHeader = 'Hours Of Operation',
	
	isOnline = [ 'Yes', 'No' ],
	isOnlineCheckboxHeader = 'Have Online Operation',

	...props
}) => {
	const [ selected, setSelected ] = useState([]);
	const [ isOnileSelected, setIsOnileSelected ] = useState();
	const [ timeSelectedStart, setTimeSelectedStart ] = useState();
	const [ timeSelectedEnd, setTimeSelectedEnd ] = useState();

	useEffect(
		() => {
			if (!isEmpty(existingData)) {
				setSelected(existingData.off_days);
			}
		},
		[ existingData ]
	);
	return (
		<Container
			width={'100vw'}
			height={'100vh'}
			paddingTop={'70px'}
			paddingBottom={'180px'}
			paddingLeft={'10%'}
			paddingRight={'10%'}>
			<FCAppBar {...props} />

			<FlexContainer flexDirection='column' alignItems='center' marginTop={'0px'} width={'100%'}>
				<LoadingAnimationPopup showPopup={isLoading} />

				<HeaderOne text={<p>Business Hours and Contact Details</p>} color={Colors.darkBlack} bold />
				<CheckBoxes
					header={checkboxHeader}
					names={checkboxOpions}
					selected={selected}
					setSelected={setSelected}
					props={props}
				/>
				<Spacing space={'50px'} mobileSpace={'50px'} />
				<FlexContainer
					mobileWidth={'266px'}
					width={'600px'}
					flexDirection='row'
					justifyContent='space-between'
					alignItems='space-between'>
					<Container width={'210px'} mobileWidth={'120px'}>
						<FormDropdown
							title={'Start Time'}
							value={
								timeSelectedStart || {
									value : get(existingData.off_time, 'start'),
									label : get(existingData.off_time, 'start')
								}
							}
							options={time}
							onChange={setTimeSelectedStart}
							required={true}
						/>
					</Container>
					<Container width={'210px'} mobileWidth={'120px'}>
						<FormDropdown
							title={'End Time'}
							value={
								timeSelectedEnd || {
									value : get(existingData.off_time, 'end'),
									label : get(existingData.off_time, 'end')
								}
							}
							options={time}
							onChange={setTimeSelectedEnd}
							required={true}
						/>
					</Container>
				</FlexContainer>

				<Spacing space={'50px'} mobileSpace={'50px'} />
				<FlexContainer
					mobileWidth={'266px'}
					width={'600px'}
					flexDirection='row'
					justifyContent='space-between'
					alignItems='space-between'>
					<FormDropdown
						title={isOnlineCheckboxHeader}
						value={
							isOnileSelected || {
								value : get(existingData, 'off_isonline') == 'isOnline' ? 'isOnline' : 'notOnline',
								label : get(existingData, 'off_isonline')
							}
						}
						options={[ { value: 'isOnline', label: 'Yes' }, { value: 'notOnline', label: 'No' } ]}
						onChange={setIsOnileSelected}
						required={true}
					/>
				</FlexContainer>

				<FlexContainer flexDirection={'column'} mobileWidth={'266px'} width={'600px'}>
					<Spacing space={'50px'} mobileSpace={'50px'} />
					<StyledForm>
						<FormInput
							cancellable={!isEmpty(pocName)}
							error={isAllFilledPageTwo && isEmpty(pocName)}
							onChange={setPocName}
							title={'Point of Contact Name'}
							value={pocName}
							handleBlur={validateAllFieldsPageTwo}
							required={true}
						/>
					</StyledForm>
					<Spacing space={'50px'} mobileSpace={'50px'} />
					<StyledForm>
						<FormInput
							cancellable={!isEmpty(pocTitle)}
							error={isAllFilledPageTwo && isEmpty(pocTitle)}
							onChange={setPocTitle}
							title={'Point of Contact Title'}
							value={pocTitle}
							handleBlur={validateAllFieldsPageTwo}
							required={true}
						/>
					</StyledForm>
					<Spacing space={'50px'} mobileSpace={'50px'} />
					<StyledForm>
						<FormInput
							cancellable={!isEmpty(pocEmail)}
							error={pocEmailError[0]}
							errorMessage={pocEmailError[1]}
							onChange={setPocEmail}
							title={'Point of Contact Email'}
							value={pocEmail}
							handleBlur={() => {
								validateAllFieldsPageTwo();
								validatePocEmail();
							}}
							onChangeHandler={() => validatePocEmail('setNull')}
							required={true}
						/>
					</StyledForm>
					<Spacing space={'50px'} mobileSpace={'50px'} />
					<StyledForm>
						<FormInput
							cancellable={!isEmpty(pocPhone)}
							error={pocPhoneError[0]}
							errorMessage={pocPhoneError[1]}
							onChange={setPocPhone}
							title={'Point of Contact Phone'}
							value={pocPhone}
							handleBlur={() => {
								validateAllFieldsPageTwo();
								validatePocPhone();
							}}
							onChangeHandler={() => validatePocPhone('setNull')}
							required={true}
						/>
					</StyledForm>
				</FlexContainer>
				{(!isEmpty(pocPhone) || isAllFilledPageTwo) && (
					<ButtonContainerX>
						<Button onClick={backHandler} text={'Back'} />

						<Button
							active
							onClick={() =>
								continueHandler(2, [
									selected,
									isOnileSelected || {
										value :
											get(existingData, 'off_isonline') == 'isOnline' ? 'isOnline' : 'notOnline',
										label : get(existingData, 'off_isonline')
									},
									timeSelectedStart || {
										value : get(existingData.off_time, 'start'),
										label : get(existingData.off_time, 'start')
									},
									timeSelectedEnd || {
										value : get(existingData.off_time, 'end'),
										label : get(existingData.off_time, 'end')
									}
								])}
							text={'Continue'}
						/>
					</ButtonContainerX>
				)}
				<Spacing space={'150px'} mobileSpace={'110px'} />
			</FlexContainer>
		</Container>
	);
};

export { OrgFormTwo };

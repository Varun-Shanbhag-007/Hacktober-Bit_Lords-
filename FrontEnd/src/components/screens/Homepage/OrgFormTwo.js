import { HeaderOne, HeaderTwo, Description, Note, HeaderThree } from '../../../styles/Texts';
import { Colors } from '../../../styles/Colors';
import { FlexContainer, Container, Spacing } from '../../../styles/StylingComponents';
import { Button } from '../../../styles/Button';
import { get, isEmpty } from 'lodash';
import { FormInput, FormPasswordInput, FormDropdown } from '../../../styles/Forms';
import React, { Fragment, useState } from 'react';
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
				flexDirection='row'
				justifyContent='space-between'
				alignItems='space-between'>
				{names.map((val, idx) => (
					<Container minWidth={'100px'}>
						<input type='checkbox' {...props} onClick={() => selectedHandler(val)} />
						<Container width={'20px'} />
						<Note text={<p>{val}</p>} />
					</Container>
				))}
			</FlexContainer>
		</Container>
	);
};

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

	orgStreetAddress,
	setOrgStreetAddress,
	zipCode,
	setZipCode,
	orgStateName,
	setOrgStateName,
	orgCityName,
	setOrgCityName,
	zipError,
	isZipError,
	zipErrorMessage,
	validateAndFetchZip,
	OrgWebsite,
	validateWebsite,
	setOrgWebsite,
	websiteError,
	orgEmail,
	setOrgEmail,
	emailError,
	validateEmail,
	continueHandler,
	pocPhone,
	setPocPhone,
	pocPhoneError,
	validatePocPhone,

	checkboxOpions = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
	checkboxHeader = 'Hours Of Operation',

	isOnline = [ 'Yes', 'No' ],
	isOnlineCheckboxHeader = 'Have Online Operation',

	...props
}) => {
	const [ selected, setSelected ] = useState([]);
	const [ isOnileSelected, setIsOnileSelected ] = useState();

	return (
		<Container width={'100vw'} paddingTop={'70px'} paddingBottom={'180px'} paddingLeft={'10%'} paddingRight={'10%'}>
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
					<FormDropdown
						title={isOnlineCheckboxHeader}
						value={isOnileSelected}
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

				{isAllFilledPageTwo && (
					<ButtonContainerX>
						<Button active onClick={() => continueHandler(1)} text={'Continue'} />
					</ButtonContainerX>
				)}
			</FlexContainer>
		</Container>
	);
};

export { OrgFormTwo };

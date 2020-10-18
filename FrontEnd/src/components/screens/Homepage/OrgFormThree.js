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

const OrgFormThree = ({
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
		'Family, Children, and Survivors',
		'Women Veterans',
		'Employment & Job Training',
		'Legal Support',
		'Education',
		'Homelessness & Housing',
		'Benefits',
		'Emergency Financial Assistance',
		'Financial Literacy',
		'Behavioral Health/Mental Health',
		'Food Insecurity',
		'Transportation',
		'Medical',
		'Dental'
	],
	checkboxHeader = 'Please indicate if your organization provides assistance in one or more of the following categories *',
	checkboxOpionsComplTherapies = [
		'Acupuncture',
		'Massage Therapy',
		'Horticultural Therapy',
		'Equine Therapy',
		'Yoga/Mediation/Mindfulness',
		'Recreational Therapy',
		'No'
	],
	specializedMedServices = [
		'Physical Rehab',
		'PTSD Support',
		'Traumatic Brain Injury (TBI)',
		'Spinal Cord Injury (SCI)',
		'None'
	],
	isOnline = [ 'Yes', 'No' ],
	isOnlineCheckboxHeader = 'Have Online Operation',
	existingData,
	...props
}) => {
	const [ pageNum, setpageNum ] = useState(1);
	const [ selectedMilitary, setSelectedMilitary ] = useState([]);
	const [ isAllSelected, setisAllSelected ] = useState(false);
	const [ allSelected, setAllSelected ] = useState({});
	const [ isPeerSupported, setIsPeerSupported ] = useState();
	const [ isHotlineSupported, setIsHotlineSupported ] = useState();
	const [ columnTherapies, setColumnTherapies ] = useState([]);
	const [ columnTherapiesX, setColumnTherapiesX ] = useState([]);

	const [ extraMed, setExtraMed ] = useState([]);
	const [ extraMedX, setExtraMedX ] = useState([]);

	const pageSelectionHandler = () => {
		switch (pageNum) {
			case 1:
				setAllSelected({ ...allSelected, program_category: selectedMilitary, program_tags: tags });
				break;
			case 2:
				continueHandler(3, {
					...allSelected,
					is_peer_support : existingData.is_peer_support || (isPeerSupported && isPeerSupported.label),
					is_hotline      : existingData.is_hotline || (isHotlineSupported && isHotlineSupported.label),
					medical_therapy : [ ...columnTherapies, columnTherapiesX ],
					medical_service : [ ...extraMed, extraMedX ]
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

	useEffect(() => {
		if (pageNum === 1 && !isEmpty(selectedMilitary)) {
			setisAllSelected(true);
		}
		else if (
			pageNum === 2 &&
			!isEmpty(isPeerSupported) &&
			!isEmpty(isHotlineSupported) &&
			!isEmpty(columnTherapies) &&
			!isEmpty(extraMed)
		) {
			setisAllSelected(true);
		}
		else setisAllSelected(false);
	});

	useEffect(
		() => {
			if (!isEmpty(existingData)) {
				setSelectedMilitary(existingData.program_category);
				setColumnTherapies(existingData.medical_therapy);
				setExtraMed(existingData.medical_service);
				setIsPeerSupported({ value: 'isPeerSupported', label: existingData.is_peer_support || 'No' });
				setIsHotlineSupported({ value: 'isPeerSupported', label: existingData.is_hotline || 'No' });
			}
		},
		[ existingData ]
	);

	return (
		<Container width={'100vw'} paddingTop={'70px'} paddingBottom={'180px'} paddingLeft={'10%'} paddingRight={'10%'}>
			<FCAppBar {...props} />

			<FlexContainer flexDirection='column' alignItems='center' marginTop={'0px'} width={'100%'}>
				<LoadingAnimationPopup showPopup={isLoading} />

				<HeaderOne text={<p>Assistanece and Services offered</p>} color={Colors.darkBlack} bold />
				{pageNum === 1 && (
					<CheckBoxes
						header={checkboxHeader}
						names={checkboxOpions}
						selected={selectedMilitary}
						setSelected={setSelectedMilitary}
						props={props}
					/>
				)}
				{pageNum === 1 && (
					<FlexContainer flexDirection={'column'} mobileWidth={'266px'} width={'600px'}>
						<Spacing space={'50px'} mobileSpace={'50px'} />
						<StyledForm>
							<FormInput
								cancellable={!isEmpty(tags)}
								error={isAllFilledPageThree && isEmpty(tags)}
								onChange={setTags}
								title={'Add tags related to your services(e.g.: Medicine, Banking, Tutor etc.'}
								value={tags}
								handleBlur={validateAllFieldsPageThree}
							/>
						</StyledForm>
					</FlexContainer>
				)}

				{pageNum === 2 && (
					<FlexContainer flexDirection={'column'} mobileWidth={'266px'} width={'600px'}>
						<Spacing space={'50px'} mobileSpace={'50px'} />
						<CheckBoxes
							header={
								'Does your organization provide any of the following integrated/complementary & alternative therapies?'
							}
							names={checkboxOpionsComplTherapies}
							selected={columnTherapies}
							setSelected={setColumnTherapies}
							props={props}
						/>
					</FlexContainer>
				)}
				{pageNum === 2 && (
					<FlexContainer flexDirection={'column'} mobileWidth={'266px'} width={'600px'} paddingLeft={'50px'}>
						<StyledForm>
							<FormInput
								cancellable={!isEmpty(columnTherapiesX)}
								error={isAllFilledPageThree && isEmpty(columnTherapiesX)}
								onChange={setColumnTherapiesX}
								title={'Other:'}
								value={columnTherapiesX}
								handleBlur={validateAllFieldsPageThree}
							/>
						</StyledForm>
					</FlexContainer>
				)}

				{/* specialized medical services */}
				{pageNum === 2 && (
					<FlexContainer flexDirection={'column'} mobileWidth={'266px'} width={'600px'}>
						<Spacing space={'50px'} mobileSpace={'50px'} />
						<CheckBoxes
							header={'Does your organization provide any of the following specialized medical services?'}
							names={specializedMedServices}
							selected={extraMed}
							setSelected={setExtraMed}
							props={props}
						/>
					</FlexContainer>
				)}
				{pageNum === 2 && (
					<FlexContainer flexDirection={'column'} mobileWidth={'266px'} width={'600px'} paddingLeft={'50px'}>
						<StyledForm>
							<FormInput
								cancellable={!isEmpty(extraMedX)}
								error={isAllFilledPageThree && isEmpty(extraMedX)}
								onChange={setExtraMedX}
								title={'Other:'}
								value={extraMedX}
								handleBlur={validateAllFieldsPageThree}
							/>
						</StyledForm>
					</FlexContainer>
				)}

				<Spacing space={'50px'} mobileSpace={'50px'} />
				{pageNum === 2 && (
					<Container>
						<FlexContainer
							mobileWidth={'266px'}
							width={'600px'}
							flexDirection='row'
							justifyContent='space-between'
							alignItems='space-between'>
							<FormDropdown
								title={'Does your organization provide veteran peer-to-peer support?'}
								value={isPeerSupported}
								options={[
									{ value: 'isPeerSupported', label: 'Yes' },
									{ value: 'isPeerSupported', label: 'No' }
								]}
								onChange={setIsPeerSupported}
								required={true}
							/>
						</FlexContainer>
						<FlexContainer
							mobileWidth={'266px'}
							width={'600px'}
							flexDirection='row'
							justifyContent='space-between'
							alignItems='space-between'>
							<FormDropdown
								title={'Does your organization have a hotline?'}
								value={isHotlineSupported}
								options={[
									{ value: 'isHotlineSupported', label: 'Yes' },
									{ value: 'isHotlineSupported', label: 'No' }
								]}
								onChange={setIsHotlineSupported}
								required={true}
							/>
						</FlexContainer>
					</Container>
				)}

				{(!isEmpty(existingData) || isAllFilledPageThree || isAllSelected) && (
					<ButtonContainerX>
						<Button active onClick={pageSelectionHandler} text={'Continue'} />
					</ButtonContainerX>
				)}
			</FlexContainer>
		</Container>
	);
};

export { OrgFormThree };

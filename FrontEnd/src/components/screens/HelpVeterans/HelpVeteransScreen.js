import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import FCAppBar from '../../FCAppBar/FCAppBar';
import { useAuth0 } from '@auth0/auth0-react';
import { isEmpty, get } from 'lodash';
import LoadingAnimationPopup from '../../Loader/loader';
import { FlexContainer, Container, Spacing } from '../../../styles/StylingComponents';
import { HeaderOne, Note, HeaderTwo, HeaderThree, Description } from '../../../styles/Texts';
import { FormInput, FormPasswordInput, FormDropdown } from '../../../styles/Forms';
import { Colors } from '../../../styles/Colors';
import styled from 'styled-components';
import RadiusSlider from './RadiusSlider';
import { Button } from '../../../styles/Button';

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
	height: 176px;
	padding-left: 2%;
	display: flex;
	justify-content: center;
	align-items: center;

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

			<FlexContainer mobileWidth={'266px'} width={'600px'} flexDirection='column' alignItems='flex-start'>
				{names.map((val, idx) => (
					<FlexContainer minWidth={'100px'} justifyContent='center' alignItems='center'>
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

const ResultCard = ({ val, zipcode }) => {
	return (
		<FlexContainer flexDirection={'column'} width={'100%'}>
			<Container
				width={'70%'}
				border={'2px solid #E8E8E8'}
				backgroundColor={'#ffffff'}
				boxShadow={'5px #292929'}
				marginBottom={'50px'}
				marginLeft={'15%'}
				borderRadius={'1px'}
				padding={'20px'}>
				<FlexContainer flexDirection={'column'}>
					<Container width={'100%'} paddingTop={'0px'} paddingBottom={'0px'} margin='0px'>
						<FlexContainer flexDirection='row' justifyContent={'center'} alignItems={'center'}>
							<HeaderThree text={<p>{val.org_name}</p>} bold={700} color={'#4e78f7'} />

							<Container width='20px' height='20px' />
							<Note
								text={<p>{`${val.distance} Miles from ${zipcode}`}</p>}
								color={Colors.errorRed}
								bold={700}
							/>
						</FlexContainer>

						<Container width={'100%'}>
							<Note
								bold
								text={
									<p>{`${val.org_site == 'nan'
										? 'No Website'
										: val.org_site} | ${val.org_ph_no} | ${val.org_street_address}, ${val.org_state}, ${val.org_city}, ${val.org_zip}`}</p>
								}
								color={Colors.darkestGrey}
							/>
						</Container>
						<hr style={{ border: '0.5px solid #cdcdcd' }} />
					</Container>

					<Container width={'100%'}>
						<FlexContainer width={'100%'} flexDirection='row'>
							{/* <Container
								width={'20%'}
								height={'160px'}
								borderRadius='10px'
								backgroundColor={Colors.lightGgreen}
							/> */}
							<Container width={'100%'} paddingLeft={'20px'}>
								<FlexContainer
									flexDirection='column'
									justifyContent='flex-start'
									alignItems='flex-start'
									textAlign='start'>
									<Container width={'100%'}>
										<Note
											text={
												<p>{`POC | Email ${val.poc_email} | Name: ${val.poc_name} | Title: ${val.poc_title} | Phone: ${val.poc_ph_no}`}</p>
											}
										/>
									</Container>

									<Container width={'100%'}>
										<Note
											text={
												<p>{`MILITARY | Status ${val.military_status.map(
													(val) => val
												)} | Service Era: ${val.serivce_era.map(
													(el) => el
												)} | Discharge Status: ${val.discharge_status.map(
													(el) => el
												)} | Is Combat Service: ${val.is_combat_service}`}</p>
											}
										/>
									</Container>
								</FlexContainer>
							</Container>
						</FlexContainer>
					</Container>
				</FlexContainer>
			</Container>
		</FlexContainer>
	);
};

const HelpVeteransScreen = ({
	ApiCall,
	setApiCall,
	isLoading,
	zipcode,
	setZipcode,
	isZipError,
	zipErrorMessage,
	validateZipCode,
	searchKey,
	setSearchKey,
	validateSearch,
	validateSearchQuery,
	selectedcategory,
	setSelectedcategory,
	allData,
	allDataFetched,
	catNames = [
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
	filters,
	FilterHandler,
	setFilters
}) => {
	const [ filterMilitary, setfilterMilitary ] = useState('');
	const [ disabilityfilter, setdisabilityfilter ] = useState('');
	const [ addFamilyFilter, setaddFamilyFilter ] = useState('');
	const [ isSubscribedFilter, setisSubscribedFilter ] = useState('');
	const sliderMin = 1;
	const sliderMax = 100;
	const [ sliderValue, setSliderValue ] = useState((sliderMin + sliderMax) / 2);
	useEffect(
		() => {
			setSliderValue((sliderMin + sliderMax) / 2);
		},
		[ sliderMin, sliderMax ]
	);

	const removeFiltersHandler = () => {
		setFilters([]);
		setfilterMilitary('');
		setdisabilityfilter('');
		setaddFamilyFilter('');
		setisSubscribedFilter('');
	};

	useEffect(
		() => {
			if (!isEmpty(filterMilitary)) {
				setFilters({ ...filters, militaryFilter: filterMilitary.value });
			}

			if (!isEmpty(disabilityfilter)) {
				setFilters({ ...filters, disabilityfilter: disabilityfilter.value });
			}

			if (!isEmpty(addFamilyFilter)) {
				setFilters({ ...filters, addFamilyFilter: addFamilyFilter.value });
			}

			if (!isEmpty(isSubscribedFilter)) {
				setFilters({ ...filters, isSubscribedFilter: isSubscribedFilter.value });
			}
		},
		[ filterMilitary, disabilityfilter, addFamilyFilter, isSubscribedFilter ]
	);

	const getText = () => {
		if (isEmpty(zipcode)) {
			return 'Enter A zipcode to iniate search.';
		}
		else if (zipcode.length === 5 && isEmpty(searchKey) && isEmpty(selectedcategory)) {
			return 'Enter a Service name/ Select a category';
		}
		else {
			return 'Apply filters for more accurate results.';
		}
	};

	return (
		<Container paddingTop={'60px'}>
			<FCAppBar />
			<FlexContainer
				maxWidth={'100vw'}
				height={'91vh'}
				alignItems={'space-between'}
				justify-conent={'space-between'}>
				<LoadingAnimationPopup showPopup={isLoading} />
				<Container
					width={'29%'}
					// backgroundColor={Colors.lightGgreen}
					height={'102%'}
					marginLeft={'1%'}
					style={{
						overflow : 'scroll'
						// backgroundColor : '#b8c6db',
						// backgroundImage : 'linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)'
					}}>
					<HeaderTwo
						text={<p>Search Here</p>}
						bold
						color={'#4e78f7'}
						style={{ fontSize: '20px', fontWeight: '650' }}
					/>
					<FlexContainer
						mobileWidth={'88%'}
						width={'88%'}
						flexDirection='column'
						justifyContent='space-between'
						paddingLeft={'15%'}
						alignItems='space-between'>
						<StyledForm>
							<FormInput
								title={<p>ZipCode*</p>}
								error={isZipError}
								errorMessage={zipErrorMessage}
								value={zipcode}
								onChange={setZipcode}
								handleBlur={() => validateZipCode('check', zipcode)}
							/>
						</StyledForm>

						{!isZipError &&
						!isEmpty(zipcode) &&
						zipcode.length === 5 && (
							<Fragment>
								<StyledForm>
									<FormInput
										title={<p>Search For Services</p>}
										error={false}
										errorMessage={false}
										value={searchKey}
										onChange={setSearchKey}
										handleBlur={validateSearch}
									/>
								</StyledForm>
								<CheckBoxes
									header={'Category'}
									names={catNames}
									selected={selectedcategory}
									setSelected={setSelectedcategory}
								/>
							</Fragment>
						)}

						{!isZipError &&
						!isEmpty(zipcode) &&
						zipcode.length === 5 &&
						(!isEmpty(selectedcategory) || !isEmpty(searchKey)) && (
							<Fragment>
								<Spacing space={'50px'} />
								<HeaderTwo text={<p>Additional Filters</p>} bold />
								<FormDropdown
									title={'Military Status ?'}
									value={filterMilitary}
									options={[
										{ value: 'Active Duty', label: 'Active Duty' },
										{ value: 'Guard/Reserve', label: 'Guard/Reserve' },
										{ value: 'Veteran', label: 'Veteran' },
										{ value: 'Retired', label: 'Retired' },
										{ value: 'Family & Children', label: 'Family & Children' },
										{ value: 'Caregivers & Survivors', label: 'Caregivers & Survivors' }
									]}
									onChange={setfilterMilitary}
									handleBlur={validateSearch}
								/>

								<FormDropdown
									title={'Disability required ?'}
									value={disabilityfilter}
									options={[ { value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' } ]}
									onChange={setdisabilityfilter}
									handleBlur={validateSearch}
								/>

								<FormDropdown
									title={'Additional Family Allowed ?'}
									value={addFamilyFilter}
									options={[ { value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' } ]}
									onChange={setaddFamilyFilter}
									handleBlur={validateSearch}
								/>

								<FormDropdown
									title={'Is Subscribed ?'}
									value={isSubscribedFilter}
									options={[ { value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' } ]}
									onChange={setisSubscribedFilter}
									handleBlur={validateSearch}
								/>
							</Fragment>
						)}
						{((!isEmpty(filters) && !isEmpty(zipcode)) ||
							(!isZipError &&
								!isEmpty(zipcode) &&
								zipcode.length === 5 &&
								(!isEmpty(selectedcategory) || !isEmpty(searchKey)))) && (
							<Fragment>
								<div
									style={{ color: 'red', cursor: 'pointer', marginTop: '20px' }}
									onClick={removeFiltersHandler}>
									Clear all Filters
								</div>
								<Spacing space={'150px'} />
								{'!isEmpty(filters)' && (
									<ButtonContainerX>
										<Button active onClick={() => validateSearchQuery(ApiCall)} text={'Continue'} />
									</ButtonContainerX>
								)}
								<Spacing space={'150px'} />
							</Fragment>
						)}
					</FlexContainer>
				</Container>

				<Container width={'88%'} height={'102%'} style={{ overflow: 'scroll' }} backgroundColor='#f8f9fa'>
					<FlexContainer
						flexDirection={'column'}
						justifyContent='center'
						alignItems='center'
						width={'100%'}
						height={'100px'}>
						<HeaderTwo
							text={`Filter with Radius in : ${sliderValue} Miles`}
							bold={700}
							style={{ fontSize: '18px' }}
						/>
						<FlexContainer width='50%' height='20px'>
							<RadiusSlider
								min={sliderMin}
								max={sliderMax}
								setSliderValue={FilterHandler}
								setSliderValueX={setSliderValue}
								defaultValue={sliderValue}
							/>
						</FlexContainer>
					</FlexContainer>

					<FlexContainer flexDirection={'column'} justifyContent='center' alignItems='center'>
						{allData.length > 0 ? (
							allData.map((val, key) => <ResultCard key={val._id} val={val} zipcode={zipcode} />)
						) : allDataFetched ? (
							<FlexContainer
								flexDirection={'row'}
								justifyContent={'center'}
								alignItems='center'
								style={{ fontSize: '30px', color: 'red' }}
								marginTop={'25%'}>
								<p>No Results found. Search Again.</p>
							</FlexContainer>
						) : (
							<FlexContainer
								flexDirection={'row'}
								justifyContent={'center'}
								alignItems='center'
								style={{ fontSize: '20px', fontStyle: 'bold', fontWeight: '600' }}
								marginTop={'25%'}>
								<p>{getText()}</p>
							</FlexContainer>
						)}
					</FlexContainer>
				</Container>
			</FlexContainer>
		</Container>
	);
};

export default HelpVeteransScreen;

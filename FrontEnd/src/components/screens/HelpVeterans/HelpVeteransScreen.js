import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import FCAppBar from '../../FCAppBar/FCAppBar';
import { useAuth0 } from '@auth0/auth0-react';
import { isEmpty, get } from 'lodash';
import LoadingAnimationPopup from '../../Loader/loader';
import { FlexContainer, Container, Spacing } from '../../../styles/StylingComponents';
import { HeaderOne, Note, HeaderTwo, Description } from '../../../styles/Texts';
import { FormInput, FormPasswordInput, FormDropdown } from '../../../styles/Forms';
import { Colors } from '../../../styles/Colors';
import styled from 'styled-components';
import RadiusSlider from './RadiusSlider';

const StyledForm = styled.div`
	@media (max-width: 768px) {
		margin: 0px 0px 18px 0px;
	}

	@media (min-width: 768px) {
		margin: 0px 0px 27px 0px;
	}
`;

const ResultCard = ({ name = 'Lorem Ipsum Doler Set Amet Imansepet', org_site }) => {
	return (
		<FlexContainer flexDirection={'column'} width={'100%'}>
			<Container
				width={'80%'}
				backgroundColor={Colors.lightGgreen}
				marginBottom={'50px'}
				marginLeft={'15%'}
				borderRadius={'20px'}
				padding={'20px'}>
				<FlexContainer flexDirection={'column'}>
					<Container width={'100%'}>
						<Description text={<p>{name}</p>} bold={700} />
					</Container>

					<Container width={'100%'}>
						<FlexContainer width={'100%'} flexDirection='row'>
							<Container
								width={'20%'}
								height={'180px'}
								borderRadius='10px'
								backgroundColor={Colors.formGrey}
							/>
							<Container width={'80%'} paddingLeft={'20px'}>
								<FlexContainer
									flexDirection='column'
									justifyContent='flex-start'
									alignItems='flex-start'
									textAlign='start'>
									<Container width={'100%'}>
										<Note
											bold
											text={
												<p>{`ORGANIZATION | Email ${'org_site'} Address: org_street_address, org_state, org_city, org_zip, General Mail: ${'org_mail'}`}</p>
											}
										/>
									</Container>

									<Container width={'100%'}>
										<Note
											bold
											text={
												<p>{`OPERATION | Email ${'org_site'} Address: org_street_address, org_state, org_city, org_zip, General Mail: ${'org_mail'}`}</p>
											}
										/>
									</Container>

									<Container width={'100%'}>
										<Note
											bold
											text={
												<p>{`MILITARY STATUS | Email ${'org_site'} Address: org_street_address, org_state, org_city, org_zip, General Mail: ${'org_mail'}`}</p>
											}
										/>
									</Container>
									<Container width={'100%'}>
										<Note
											bold
											text={
												<p>{`ASSISTANCES | Email ${'org_site'} Address: org_street_address, org_state, org_city, org_zip, General Mail: ${'org_mail'}`}</p>
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
	zipcode,
	setZipcode,
	isZipError,
	zipErrorMessage,
	validateZipCode,
	searchKey,
	setSearchKey,
	validateSearch,
	selectedcategory,
	setSelectedcategory
}) => {
	const sliderMin = 10;
	const sliderMax = 150;
	const [ sliderValue, setSliderValue ] = useState((sliderMin + sliderMax) / 2);

	return (
		<Container paddingTop={'70px'}>
			<FCAppBar />
			<FlexContainer
				maxWidth={'100vw'}
				height={'90vh'}
				alignItems={'space-between'}
				justify-conent={'space-between'}>
				<Container
					width={'29%'}
					backgroundColor={Colors.lightGgreen}
					height={'102%'}
					marginLeft={'1%'}
					style={{ overflow: 'scroll' }}>
					<HeaderTwo text={<p>Search Here</p>} bold />
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
								<FormDropdown
									title={'Category'}
									value={selectedcategory}
									options={[
										{ value: 'CAT1', label: 'CAT1' },
										{ value: 'CAT1', label: 'CAT1' },
										{ value: 'CAT1', label: 'CAT1' },
										{ value: 'CAT1', label: 'CAT1' },
										{ value: 'CAT1', label: 'CAT1' },
										{ value: 'CAT1', label: 'CAT1' }
									]}
									onChange={setSelectedcategory}
									handleBlur={validateSearch}
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
									value={selectedcategory}
									options={[
										{ value: 'Active Duty', label: 'Active Duty' },
										{ value: 'Guard/Reserve', label: 'Guard/Reserve' },
										{ value: 'Veteran', label: 'Veteran' },
										{ value: 'Retired', label: 'Retired' },
										{ value: 'Family & Children', label: 'Family & Children' },
										{ value: 'Caregivers & Survivors', label: 'Caregivers & Survivors' }
									]}
									onChange={setSelectedcategory}
									handleBlur={validateSearch}
								/>

								<FormDropdown
									title={'Disability required ?'}
									value={selectedcategory}
									options={[ { value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' } ]}
									onChange={setSelectedcategory}
									handleBlur={validateSearch}
								/>

								<FormDropdown
									title={'Additional Family Allowed ?'}
									value={selectedcategory}
									options={[ { value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' } ]}
									onChange={setSelectedcategory}
									handleBlur={validateSearch}
								/>

								<FormDropdown
									title={'Is Subscribed ?'}
									value={selectedcategory}
									options={[ { value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' } ]}
									onChange={setSelectedcategory}
									handleBlur={validateSearch}
								/>
								<Spacing space={'150px'} />
							</Fragment>
						)}
					</FlexContainer>
				</Container>

				<Container width={'88%'} height={'102%'} style={{ overflow: 'scroll' }}>
					<FlexContainer
						flexDirection={'column'}
						justifyContent='center'
						alignItems='center'
						width={'100%'}
						height={'100px'}>
						<HeaderTwo text={`Filter with Radius in : ${sliderValue} Miles`} bold={700} />
						<FlexContainer width='50%' height='20px'>
							<RadiusSlider
								min={sliderMin}
								max={sliderMax}
								setSliderValue={setSliderValue}
								defaultValue={[ sliderMin, sliderMax ]}
							/>
						</FlexContainer>
					</FlexContainer>

					<FlexContainer width='90%' flexDirection={'column'} justifyContent='center' alignItems='center'>
						{[ 1, 2, 3 ].map((val, key) => <ResultCard />)}
					</FlexContainer>
				</Container>
			</FlexContainer>
		</Container>
	);
};

export default HelpVeteransScreen;

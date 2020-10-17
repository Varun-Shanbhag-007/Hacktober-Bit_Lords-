import { HeaderOne, Description } from '../../../styles/Texts';
import { Colors } from '../../../styles/Colors';
import { Spacing, FlexContainer, Container } from '../../../styles/StylingComponents';
import { Button } from '../../../styles/Button';
import { get, isEmpty } from 'lodash';
import { FormInput, FormPasswordInput } from '../../../styles/Forms';
import React, { Fragment } from 'react';
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

const LoaderContainerX = styled.div`
	position: fixed;
	bottom: 50%;
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	// background: linear-gradient(0deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
`;

const HomepageScreen = ({
	isLoading,
	validateAllFields,
	isAllFilled,
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

	allowLogin,
	emailOrCell,
	error,
	errorMessage,
	forgotPassword,
	handleBack,
	handleKeyDown,
	highlightForm,
	login,
	password,
	passwordError,
	setEmailOrCell,
	setPassword,
	...props
}) => (
	<Container width={'100vw'} paddingTop={'70px'} paddingBottom={'70px'} paddingLeft={'10%'} paddingRight={'10%'}>
		<FCAppBar {...props} />
		<FlexContainer flexDirection='column' alignItems='center' marginTop={'0px'} width={'100%'}>
			<LoadingAnimationPopup showPopup={isLoading} />
			<HeaderOne text={<p>Organization Details</p>} color={Colors.darkBlack} bold />

			<FlexContainer flexDirection={'column'} mobileWidth={'266px'} width={'600px'}>
				<StyledForm>
					<FormInput
						cancellable={!isEmpty(orgStreetAddress)}
						error={isAllFilled && isEmpty(orgStreetAddress)}
						onChange={setOrgStreetAddress}
						title={'Street Address'}
						value={orgStreetAddress}
						handleBlur={validateAllFields}
						required={true}
					/>
				</StyledForm>

				<StyledForm>
					<FormInput
						cancellable={!isEmpty(zipCode)}
						error={isZipError}
						errorMessage={zipErrorMessage}
						handleKeyDown={handleKeyDown}
						onChange={setZipCode}
						title={'Zip Code'}
						value={zipCode}
						handleBlur={() => {
							validateAllFields();
							zipError('check');
							validateAndFetchZip();
						}}
						required={true}
						onChangeHandler={zipError}
					/>
				</StyledForm>

				<StyledForm>
					<FormInput
						handleKeyDown={handleKeyDown}
						title={'State'}
						value={orgStateName}
						handleBlur={validateAllFields}
						readOnly={true}
					/>
				</StyledForm>

				<StyledForm>
					<FormInput
						handleKeyDown={handleKeyDown}
						title={'City'}
						value={orgCityName}
						handleBlur={validateAllFields}
						readOnly={true}
					/>
				</StyledForm>

				<StyledForm>
					<FormInput
						cancellable={!isEmpty(OrgWebsite)}
						error={websiteError && websiteError[0]}
						errorMessage={websiteError && websiteError[1]}
						handleKeyDown={handleKeyDown}
						onChange={setOrgWebsite}
						title={'Website'}
						value={OrgWebsite}
						handleBlur={() => validateWebsite('validate')}
						onChangeHandler={()=>validateWebsite('setNull')}
					/>
				</StyledForm>

				<StyledForm>
					<FormInput
						cancellable={true}
						error={passwordError}
						handleKeyDown={handleKeyDown}
						onChange={setPassword}
						title={'General Email'}
						value={password}
						handleBlur={validateAllFields}
					/>
				</StyledForm>

				<StyledForm>
					<FormInput
						cancellable={true}
						error={passwordError}
						handleKeyDown={handleKeyDown}
						onChange={setPassword}
						title={'Main Fax'}
						value={password}
						handleBlur={validateAllFields}
					/>
				</StyledForm>
			</FlexContainer>
			{isAllFilled && (
				<ButtonContainerX>
					<Button active onClick={validateAllFields} text={'Continue'} />
				</ButtonContainerX>
			)}
		</FlexContainer>
	</Container>
);

export { HomepageScreen };

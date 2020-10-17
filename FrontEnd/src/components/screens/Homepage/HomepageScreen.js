import { HeaderOne, Description } from '../../../styles/Texts';
import { Colors } from '../../../styles/Colors';
import { Spacing, FlexContainer, Container } from '../../../styles/StylingComponents';
import { Button } from '../../../styles/Button';
import { get, isEmpty } from 'lodash';
import { FormInput, FormPasswordInput } from '../../../styles/Forms';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import FCAppBar from '../../FCAppBar/FCAppBar';

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	@media (min-width: 768px) {
		height: 90vh;
	}

	max-width: 1160px;
`;

const HeaderContainer = styled.div`
	margin-top: 10vh;
	margin-bottom: 4vh;

	@media (max-width: 768px) {
		width: 251px;
		text-align: center;
		margin-top: 5vh;
	}
`;

const StyledForm = styled.div`
	@media (max-width: 768px) {
		margin: 0px 0px 18px 0px;
	}

	@media (min-width: 768px) {
		margin: 0px 0px 27px 0px;
	}
`;

const ButtonContainer = styled.div`
	margin: 70px 0px 20px 0px;

	@media (max-width: 60px) {
		margin: 70px 0px 20px 0px;
	}
`;

const HomepageScreen = ({
	allFilled,
	orgStreetAddress,
	setOrgStreetAddress,
	orgStateName,
	setOrgStateName,
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
			<HeaderOne text={<p>Organization Details</p>} color={Colors.darkBlack} bold />

			<FlexContainer flexDirection={'column'} mobileWidth={'266px'} width={'600px'}>
				<StyledForm>
					<FormInput
						cancellable={!isEmpty(orgStreetAddress)}
						error={allFilled && isEmpty(orgStreetAddress)}
						onChange={setOrgStreetAddress}
						title={'Street Address'}
						value={orgStreetAddress}
					/>
				</StyledForm>

				<StyledForm>
					<FormInput
						cancellable={true}
						error={passwordError}
						handleKeyDown={handleKeyDown}
						onChange={setPassword}
						title={'Zip Code'}
						value={password}
					/>
				</StyledForm>

				<StyledForm>
					<FormInput
						cancellable={true}
						error={passwordError}
						handleKeyDown={handleKeyDown}
						onChange={setOrgStateName}
						title={'State'}
						value={orgStateName}
					/>
				</StyledForm>

				<StyledForm>
					<FormInput
						cancellable={true}
						error={passwordError}
						handleKeyDown={handleKeyDown}
						onChange={setPassword}
						title={'City'}
						value={password}
					/>
				</StyledForm>

				<StyledForm>
					<FormInput
						cancellable={true}
						error={passwordError}
						handleKeyDown={handleKeyDown}
						onChange={setPassword}
						title={'Website'}
						value={password}
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
					/>
				</StyledForm>
			</FlexContainer>
		</FlexContainer>
	</Container>
);

export { HomepageScreen };

import { HeaderOne, Description } from '../../../styles/Texts';
import { Colors } from '../../../styles/Colors';
import { Spacing, FlexContainer, Container } from '../../../styles/StylingComponents';
import { Button } from '../../../styles/Button';
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

const LoginPageScreen = ({
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
	<Container width={'100vw'} height={'100vh'}>
		<FCAppBar {...props} />

		<FlexContainer flexDirection='column' alignItems='center'>
			<PageContainer>
				<HeaderContainer>
					<HeaderOne color={Colors.darkGreen} text={<p>Welcome Back</p>} />
				</HeaderContainer>

				{error && (
					<Fragment>
						{/* <CenteredTextTile text={errorMessage} /> */}
						<Spacing mobileSpace={'15px'} space={'30px'} />
					</Fragment>
				)}

				<FlexContainer flexDirection={'column'} mobileWidth={'266px'} width={'600px'}>
					<StyledForm>
						<FormInput
							cancellable={emailOrCell.length > 0}
							error={highlightForm || error}
							onChange={setEmailOrCell}
							title={'Email or Mobile Phone'}
							value={emailOrCell}
						/>
					</StyledForm>

					<StyledForm>
						<FormPasswordInput
							cancellable={password.length > 0}
							error={passwordError}
							handleKeyDown={handleKeyDown}
							onChange={setPassword}
							title={'Password'}
							value={password}
						/>
					</StyledForm>

					<FlexContainer
						alignItems={'center'}
						highlightForm={highlightForm || error}
						justifyContent={highlightForm ? 'space-between' : 'flex-end'}
						mobileWidth={'266px'}
						width={'600px'}>
						{highlightForm && (
							<a href={'/createAccount'}>
								<Description color={Colors.manifestBlue} pointer text={<p>Create Account</p>} />
							</a>
						)}
						<Description
							color={Colors.lightGreen}
							onClick={forgotPassword}
							pointer
							text={<p>Forgot Password?</p>}
						/>
					</FlexContainer>
				</FlexContainer>

				<ButtonContainer>
					<Button
						active={allowLogin}
						// onClick={allowLogin ? login : null}
						onClick={() => props.history.push('./homepage')}
						text={'Sign In'}
						color={Colors.darkGreen}
					/>
				</ButtonContainer>
			</PageContainer>
		</FlexContainer>
	</Container>
);

export { LoginPageScreen };

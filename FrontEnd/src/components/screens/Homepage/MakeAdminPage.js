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

const MakeAdminPage = ({ setshowAdminPage, updateUserType, setIsLoading, props }) => {
	const [ val, setVal ] = useState('');

	useEffect(() => {
		setIsLoading(false);
	}, []);

	const makeAdmin = () => {
		updateUserType(val);
		console.log('Made Admin');
	};

	return (
		<FlexContainer justifyContent='center' alignItems='center' width={'100vw'} paddingTop='10%' paddingBottom='10%'>
			<FCAppBar {...props} />
			<FlexContainer flexDirection={'column'} mobileWidth={'266px'} width={'600px'}>
				<Spacing space={'50px'} mobileSpace={'50px'} />
				<StyledForm>
					<FormInput
						cancellable={!isEmpty(val)}
						onChange={setVal}
						title={'Enter User ID to make Admin:'}
						value={val}
						handleBlur={null}
					/>
				</StyledForm>
			</FlexContainer>
			<ButtonContainerX>
				{!isEmpty(val) && (
					<Button
						active
						onClick={() => {
							makeAdmin();
							props.history.push('./main');
						}}
						text={'Continue'}
					/>
				)}
			</ButtonContainerX>
		</FlexContainer>
	);
};

export default MakeAdminPage;

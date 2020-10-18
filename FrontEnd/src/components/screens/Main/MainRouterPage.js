import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import FCAppBar from '../../FCAppBar/FCAppBar';
import { useAuth0 } from '@auth0/auth0-react';
import { isEmpty, get } from 'lodash';
import LoadingAnimationPopup from '../../Loader/loader';
import { FlexContainer, Container, Spacing } from '../../../styles/StylingComponents';
import { HeaderOne, Note } from '../../../styles/Texts';
import { Colors } from '../../../styles/Colors';
import styled from 'styled-components';

const Card = styled(FlexContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:hover {
	  opacity: 0.85;
  }
`;

const CardTile = ({ options, ...props }) => {
	const onCickHandler = (route) => {
		props.history.push(route);
	};
	return (
		<FlexContainer flexDirection={'row'} justifyContent='center' alignItems='center' alignSelf={'center'} pointer>
			{options.map((item, idx) => {
				return (
					<Card
						key={item.name + idx}
						style={{ cursor: 'pointer' }}
						width={'300px'}
						height={'200px'}
						backgroundColor={Colors.lightGgreen}
						borderRadius={'10px'}
						margin={'25px'}
						onClick={() => onCickHandler(item.goTo)}
						options={options}
						pointer>
						<Note text={item.name} bold={700} pointer />
					</Card>
				);
			})}
		</FlexContainer>
	);
};

const MainRouterPage = ({ userType, ...props }) => {
	let options = [];
	if (userType == 'SU') {
		options = [
			{ name: 'Help Veterans', goTo: '/helpVeterans' },
			{ name: 'Edit Record', goTo: '/main' },
			{ name: 'Add Admin', goTo: '/main' }
		];
	}

	return (
		<FlexContainer
			flexDirection={'row'}
			justifyContent='center'
			alignItems='center'
			alignSelf={'center'}
			height={'100vh'}
			width={'100vw'}>
			<FCAppBar {...props} />
			<CardTile options={options} {...props} />
		</FlexContainer>
	);
};

export default MainRouterPage;

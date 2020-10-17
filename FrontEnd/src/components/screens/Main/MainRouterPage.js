import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import FCAppBar from '../../FCAppBar/FCAppBar';
import { useAuth0 } from '@auth0/auth0-react';
import { isEmpty, get } from 'lodash';
import LoadingAnimationPopup from '../../Loader/loader';
import { FlexContainer, Container, Spacing } from '../../../styles/StylingComponents';
import { HeaderOne } from '../../../styles/Texts';
import { Colors } from '../../../styles/Colors';

const CardTile = ({ items = [ 1, 2, 3 ] }) => {
	return (
		<FlexContainer flexDirection={'row'} justifyContent='center' alignItems='center' alignSelf={'center'}>
			{items.map((item, idx) => {
				return (
					<Container
						key={item + idx}
						width={'300px'}
						height={'200px'}
						backgroundColor={Colors.lightGgreen}
						borderRadius={'10px'}
						margin={'25px'}
					/>
				);
			})}
		</FlexContainer>
	);
};

const MainRouterPage = ({ ...props }) => {
	return (
		<FlexContainer
			flexDirection={'row'}
			justifyContent='center'
			alignItems='center'
			alignSelf={'center'}
			height={'100vh'}
			width={'100vw'}>
			<FCAppBar {...props} />
			<CardTile />
		</FlexContainer>
	);
};

export default MainRouterPage;

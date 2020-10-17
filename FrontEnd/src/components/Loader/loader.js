import React, { Fragment } from 'react';
import styled from 'styled-components';

import Loading from './loader.gif';

const PopupOuterContainer = styled.div`
	width: 100%;
	height: 100%;
	overflow-y: hidden;
	z-index: 100;
	position: fixed;
	background-color: rgba(255, 255, 255, 0.7);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const LoaderContainer = styled.div`
	background-color: white;
	border-radius: 20px;
	z-index: 101;
	// position: fixed;
	width: 120px;
	height: 120px;
	padding-top: 25px;
	box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.2);
	overflow: hidden;
`;

const CenterAlign = styled.div`
	width: 100vw;
	height: 100vh;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LoadingAnimationPopup = ({ showPopup }) => {
	const sourceImage = Loading;
	return (
		<Fragment>
			{showPopup && (
				<Fragment>
					<CenterAlign>
						<PopupOuterContainer />
						<LoaderContainer>
							<img
								alt={'loading...'}
								src={sourceImage}
								style={{
									maxHeight : '250px',
									maxWidth  : '250px'
								}}
							/>
						</LoaderContainer>
					</CenterAlign>
				</Fragment>
			)}
		</Fragment>
	);
};

export default LoadingAnimationPopup;

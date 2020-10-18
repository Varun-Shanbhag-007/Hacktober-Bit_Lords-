import React, { Fragment } from 'react';
import styled from 'styled-components';
import { FlexContainer } from '../StylingComponents';
import PropTypes from 'prop-types';
import { BackArrowIcon } from '../Icons';
import { Colors } from '../../styles/Colors';

const ButtonContainer = styled(FlexContainer)`
  cursor: ${(props) => (props.active ? 'pointer' : 'not-allowed')};
  background: ${(props) =>
		props.error ? Colors.red : props.inverted ? 'white' : props.active ? Colors.darkGreen : Colors.lightGrey};
  border: ${(props) => (props.inverted ? '3px' : '1px')} solid
    ${(props) =>
		props.error
			? Colors.red
			: props.active ? Colors.darkGreen : props.inverted ? Colors.darkGrey : Colors.lightGrey};
      }
  
  &:hover {
    opacity: ${(props) => (props.inverted ? '0.65' : '0.85')};
    transition: 0.3s;
  }
`;

const RoundedContainer = styled(ButtonContainer)`
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
`;

const ButtonText = styled.p`
	color: ${(props) =>
		props.inverted && !props.active
			? Colors.darkGrey
			: props.inverted ? Colors.darkGreen : props.active ? 'white' : 'black'};
	font-size: ${(props) => (props.isSmall ? '15px' : '20px')};
	font-style: normal;
	font-weight: 600;
	line-height: ${(props) => (props.isSmall ? '23px' : '0px')};
	font-family: roboto;

	@media (max-width: 768px) {
		font-size: ${(props) => (props.isSmall ? '15px' : '15px')};
		line-height: ${(props) => (props.isSmall ? '23px' : '0px')};
	}
`;

const BackArrowContainer = styled.div`
	top: 1.3vh;
	left: 10%;
	position: fixed;
	z-index: 6;
	width: 50px;
	height: 50px;
	background-color: transparent;
	border-radius: 100%;
	cursor: pointer;

	@media (min-width: 1500px) {
		position: fixed;
		left: 20%;
	}

	@media (min-width: 768px) {
		svg {
			width: 50px;
			height: 50px;
		}

		top: 1.1vh;
	}

	@media (max-width: 768px) {
		svg {
			width: 35px;
			height: 19px;
			stroke-width: 2em;
		}

		top: 22px;
		left: 5vw;
	}
`;

const RegularButton = ({ text, active = true, onClick, inverted = false, error = false }) => {
	return (
		<Fragment>
			<RoundedContainer
				width='200px'
				height='60px'
				mobileWidth='170px'
				mobileHeight='50px'
				justifyContent='center'
				alignItems='center'
				inverted={inverted}
				onClick={active && onClick}
				active={active}
				error={error}>
				<ButtonText inverted={inverted} active={active}>
					{text}
				</ButtonText>
			</RoundedContainer>
		</Fragment>
	);
};

const SmallButton = ({ text, active = true, onClick, inverted = false, error = false }) => {
	return (
		<Fragment>
			<RoundedContainer
				width='150px'
				height='60px'
				mobileWidth='110px'
				mobileHeight='50px'
				justifyContent='center'
				alignItems='center'
				onClick={active && onClick}
				active={active}
				inverted={inverted}
				error={error}>
				<ButtonText inverted={inverted} active={active}>
					{text}
				</ButtonText>
			</RoundedContainer>
		</Fragment>
	);
};

const LongButton = ({ text, active = true, onClick, inverted = false, error = false }) => {
	return (
		<Fragment>
			<ButtonContainer
				width='100%'
				maxWidth='560px'
				mobileMaxWidth='306px'
				height='40px'
				mobileHeight='30px'
				justifyContent='center'
				alignItems='center'
				borderRadius='10px'
				onClick={active && onClick}
				active={active}
				inverted={inverted}
				error={error}>
				<ButtonText inverted={inverted} active={active}>
					{text}
				</ButtonText>
			</ButtonContainer>
		</Fragment>
	);
};

const Button = ({ type = 'regular', ...args }) => {
	return type === 'long' ? (
		<LongButton {...args} />
	) : type === 'small' ? (
		<SmallButton {...args} />
	) : (
		<RegularButton {...args} />
	);
};

const BackArrow = ({ onClick = null }) => {
	return (
		<BackArrowContainer onClick={onClick}>
			<BackArrowIcon color='black' />
		</BackArrowContainer>
	);
};

Button.propTypes = {
	text     : PropTypes.string,
	active   : PropTypes.bool,
	onClick  : PropTypes.func,
	inverted : PropTypes.bool,
	type     : PropTypes.string
};

BackArrow.propTypes = {
	onClick : PropTypes.func
};

export { Button, BackArrow };

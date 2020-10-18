import styled from 'styled-components';

const Container = styled.div`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	max-width: ${(props) => props.maxWidth};
	max-height: ${(props) => props.maxHeight};
	background-color: ${(props) => props.backgroundColor};
	cursor: ${(props) => (props.active ? 'pointer' : props.pointer)};

	border: ${(props) => props.border};
	border-radius: ${(props) => props.borderRadius};
	border-top-left-radius: ${(props) => props.borderTopLeftRadius};
	border-top-right-radius: ${(props) => props.borderTopRightRadius};
	border-bottom-left-radius: ${(props) => props.borderBottomLeftRadius};
	border-bottom-right-radius: ${(props) => props.borderBottomRightRadius};

	margin: ${(props) => props.margin};
	margin-top: ${(props) => props.marginTop};
	margin-left: ${(props) => props.marginLeft};
	margin-right: ${(props) => props.marginRight};
	margin-bottom: ${(props) => props.marginBottom};

	padding: ${(props) => props.padding};
	padding-top: ${(props) => props.paddingTop};
	padding-right: ${(props) => props.paddingRight};
	padding-bottom: ${(props) => props.paddingBottom};
	padding-left: ${(props) => props.paddingLeft};

	transition: ${(props) => props.transition};
	box-shadow: ${(props) => props.boxShadow};

	svg {
		width: ${(props) => props.imageWidth};
		height: ${(props) => props.imageHeight};
	}

	@media (max-width: 768px) {
		width: ${(props) => props.mobileWidth};
		height: ${(props) => props.mobileHeight};
		max-width: ${(props) => props.mobileMaxWidth};
		max-height: ${(props) => props.mobileMaxHeight};

		margin: ${(props) => props.mobileMargin};
		margin-top: ${(props) => props.mobileMarginTop};
		margin-left: ${(props) => props.mobileMarginLeft};
		margin-right: ${(props) => props.mobileMarginRight};
		margin-bottom: ${(props) => props.mobileMarginBottom};

		padding: ${(props) => props.mobilePadding};
		padding-top: ${(props) => props.mobilePaddingTop};
		padding-right: ${(props) => props.mobilePaddingRight};
		padding-bottom: ${(props) => props.mobilePaddingBottom};
		padding-left: ${(props) => props.mobilePaddingLeft};

		transition: ${(props) => props.mobileTransition};
		box-shadow: ${(props) => props.mobileBoxShadow};

		svg {
			width: ${(props) => props.mobileImageWidth};
			height: ${(props) => props.mobileImageHeight};
		}
	}
`;

const FlexContainer = styled(Container)`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  flex-wrap: ${(props) => props.flexWrap};
  text-align: ${(props) => props.textAlign};
`;

const Spacing = styled.div`
	width: 0px;
	height: 0px;
	padding: 0px;
	margin: 0px 0px ${(props) => props.space} 0px;

	@media (max-width: 768px) {
		margin: 0px 0px ${(props) => props.mobileSpace} 0px;
	}
`;

const Input = styled.input`
	font-family: Roboto;
	font-style: normal;
	font-weight: normal;
	font-size: 20px;
	line-height: 30px;
	background-color: inherit;

	@media (max-width: 768px) {
		input {
			font-size: 15px;
			line-height: 23px;
		}
	}

	::-webkit-clear-button {
		display: none;
	}

	::-webkit-inner-spin-button,
	::-webkit-calendar-picker-indicator {
		display: none;
		-webkit-appearance: none;
	}

	::-webkit-calendar-picker-indicator {
		display: none;
	}
`;

export { Container, FlexContainer, Input, Spacing };

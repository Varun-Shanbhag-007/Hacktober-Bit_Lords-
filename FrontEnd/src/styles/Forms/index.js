import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { Container, FlexContainer, Input } from '../StylingComponents';
import { Note } from '../Texts';
import { Colors } from '../Colors';
import { CircledX } from '../Icons';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const FormContainer = styled(Container)`
  border-bottom: ${(props) => (props.error ? '2px' : props.active ? '2px' : '1px')}
    solid
    ${(props) => (props.error ? Colors.errorRed : props.active ? Colors.manifestBlue : Colors.formGrey)};
  padding-bottom: 12px;

  @media (max-width: 768px) {
    padding-bottom: 6px;
  }
`;

const StyledInput = styled(Input)`
  border: solid 1px transparent;
  text-decoration: none;
  outline: none;
  width: 99%;
  padding: 0px;
  margin: 10px 0px 0px 0px;


  @media (max-width: 768px) {
    margin: 17px 0px 0px 0px;
  }
`;

const StyledCancel = styled.div`
	z-index: 2;
	margin-bottom: 10px;
	visibility: visible;
	margin-left: -28px;

	svg {
		width: 30px;
		height: 30px;
	}

	div {
		cursor: pointer;

		&:hover {
			opacity: 0.8;
		}
	}

	@media (max-width: 768px) {
		margin-bottom: 8px;
		margin-left: -22px;
		svg {
			width: 24px;
			height: 24px;
		}
	}
`;

const FormInput = ({
	title,
	value,
	onChange,
	onChangeHandler=null,
	handleBlur = null,
	placeholder = '',
	error,
	errorMessage = '',
	showOnHover,
	required = false,
	cancellable,
	icon = null,
	readOnly,
	handleKeyDown = null
}) => {
	const [ active, setActive ] = useState(false);

	const toggleHighlight = () => {
		setActive(!active);
	};

	const handleHover = (x) => {
		if (typeof showOnHover === 'function') {
			showOnHover(x);
		}
	};

	return (
		<Fragment>
			<FlexContainer width='100%' justifyContent='center' alignItems='flex-end'>
				<FormContainer width='100%' error={error} active={active}>
					<FlexContainer>
						<Note
							text={
								<p>
									{title}
									{required ? <span className='blue'> *</span> : ''}
								</p>
							}
						/>
						{icon}
					</FlexContainer>
					<StyledInput
						readOnly={readOnly}
						value={value}
						onChange={(e) => {
							onChange && onChange(e.target.value);
							onChangeHandler && onChangeHandler();
						}}
						type='text'
						placeholder={placeholder}
						onFocus={() => {
							handleHover(true);
							toggleHighlight();
						}}
						onBlur={() => {
							handleHover(true);
							toggleHighlight();
							handleBlur && handleBlur();
						}}
						onKeyDown={(e) => handleKeyDown && handleKeyDown(e.key)}
					/>
				</FormContainer>
				{cancellable && (
					<StyledCancel>
						<Container onClick={() => onChange && onChange('')}>
							<CircledX
								color={error ? Colors.errorRed : active ? Colors.manifestBlue : Colors.greyCheck}
							/>
						</Container>
					</StyledCancel>
				)}
			</FlexContainer>
			{error &&
			errorMessage.length > 0 && (
				<Container marginTop='3px'>
					<Note bold text={<p>{errorMessage}</p>} color={Colors.errorRed} />
				</Container>
			)}
		</Fragment>
	);
};

const FormPasswordInput = ({
	title,
	value,
	onChange,
	onClick,
	onBlurHandler = null,
	showOnHover,
	cancellable,
	error,
	handleKeyDown = null,
	handlePasswordError = () => () => {}
}) => {
	const [ active, setActive ] = useState(false);

	const toggleHighlight = () => {
		setActive(!active);
	};

	const handleHover = (x) => {
		if (typeof showOnHover === 'function') {
			showOnHover(x);
		}
	};

	return (
		<FlexContainer width='100%' justifyContent='flex-start' alignItems='flex-end' textAlign='start'>
			<FormContainer width='100%' error={error} active={active}>
				<Note text={<p>{title}</p>} color='#494F5E' />
				<StyledInput
					value={value}
					onChange={(e) => onChange && onChange(e.target.value)}
					type='password'
					onFocus={() => {
						handlePasswordError(false)();
						handleHover(true);
						toggleHighlight();
					}}
					onKeyDown={(e) => handleKeyDown && handleKeyDown(e.key)}
					onBlur={() => {
						toggleHighlight();
						if (handlePasswordError(true)()) {
							return;
						}
						handleHover(false);
						onBlurHandler && onBlurHandler();
					}}
					onClick={onClick}
				/>
			</FormContainer>
			{cancellable && (
				<StyledCancel>
					<Container onClick={() => onChange && onChange('')}>
						<CircledX color={error ? Colors.errorRed : active ? Colors.manifestBlue : Colors.greyCheck} />
					</Container>
				</StyledCancel>
			)}
		</FlexContainer>
	);
};

const selectStyles = {
	option             : (provided, state) => ({
		...provided,
		borderBottom    : '1px dotted ' + Colors.lightGrey,
		color           : state.isSelected ? Colors.manifestBlue : '',
		fontSize        : 16,
		backgroundColor : 'transparent',
		textAlign       : 'left',
		cursor          : 'pointer'
	}),
	container          : (base) => ({
		...base,
		width           : '100%',
		backgroundColor : 'transparent',
		border          : 'none'
	}),
	control            : (base) => ({
		...base,
		height          : 32,
		minHeight       : 32,
		fontSize        : 16,
		borderRadius    : 0,
		width           : '100%',
		textAlign       : 'left',
		cursor          : 'pointer',
		backgroundColor : 'transparent',
		border          : 'none',
		margin          : '10px 0px 0px 0px',
		hover           : 'none',
		fontFamily      : 'Inter',
		borderColor     : Colors.lightGrey,
		boxShadow       : 'none'
	}),
	dropdownIndicator  : (base) => ({
		...base,
		fontFamily : 'Inter',
		border     : 'none'
	}),
	indicatorSeparator : (base) => ({
		...base,
		display : 'none'
	}),
	valueContainer     : (base) => ({
		...base,
		padding     : 0,
		paddingLeft : 2,
		fontFamily  : 'Inter'
	}),
	menu               : (base) => ({
		...base,
		fontFamily : 'Inter',
		marginTop  : '20px',
		zIndex     : '3'
	})
};

const testOptions = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' }
];

const FormDropdown = ({
	options = testOptions,
	value = { value: '', label: '' },
	title,
	error = false,
	required = false,
	onChange = null,
	icon = null,
	errorMessage = '',
	creatable = false,
	isClearable = false
}) => {
	const [ active, setActive ] = useState(false);

	const toggleHighlight = () => {
		setActive(!active);
	};

	return (
		<Fragment>
			<FormContainer width='100%' error={error} active={active}>
				<FlexContainer>
					<Note
						text={
							<p>
								{title}
								{required ? <span className='blue'> *</span> : ''}
							</p>
						}
					/>
					{icon}
				</FlexContainer>
				{creatable ? (
					<CreatableSelect
						styles={selectStyles}
						onFocus={toggleHighlight}
						onBlur={toggleHighlight}
						options={options}
						onChange={onChange}
						value={value}
						isClearable={isClearable}
					/>
				) : (
					<Select
						styles={selectStyles}
						onFocus={toggleHighlight}
						onBlur={toggleHighlight}
						options={options}
						onChange={onChange}
						value={value}
					/>
				)}
			</FormContainer>
			{error &&
			errorMessage.length > 0 && (
				<Container marginTop='3px'>
					<Note bold text={<p>{errorMessage}</p>} color={Colors.errorRed} />
				</Container>
			)}
		</Fragment>
	);
};

const DateInput = ({
	title,
	value,
	onChange,
	placeholder = 'yyyy-MM-dd',
	error,
	errorMessage = '',
	showOnHover,
	required = false,
	cancellable,
	icon = null,
	handleKeyDown = null,
	onCancel,
	onBlurHandler = null
}) => {
	const [ active, setActive ] = useState(false);

	const toggleHighlight = () => {
		setActive(!active);
	};

	const handleHover = (x) => {
		if (typeof showOnHover === 'function') {
			showOnHover(x);
		}
	};

	return (
		<Fragment>
			<FlexContainer width='100%' justifyContent='center' alignItems='flex-end'>
				<FormContainer width='100%' error={error} active={active}>
					<FlexContainer>
						<Note
							text={
								<p>
									{title}
									{required ? <span className='blue'> *</span> : ''}
								</p>
							}
						/>
						{icon}
					</FlexContainer>
					<StyledInput
						style={{ fontSize: '16px', fontFamily: 'Inter' }}
						value={value}
						onChange={(e) => onChange && onChange(e.target.value)}
						type='date'
						placeholder={placeholder}
						onFocus={() => {
							handleHover(true);
							toggleHighlight();
						}}
						onKeyDown={(e) => handleKeyDown && handleKeyDown(e.key)}
						onBlur={() => {
							handleHover(false);
							toggleHighlight();
							onBlurHandler && onBlurHandler();
						}}
					/>
				</FormContainer>
				{cancellable && (
					<StyledCancel>
						<div onClick={onCancel}>
							<CircledX
								color={error ? Colors.errorRed : active ? Colors.manifestBlue : Colors.greyCheck}
							/>
						</div>
					</StyledCancel>
				)}
			</FlexContainer>
			{error &&
			errorMessage.length > 0 && (
				<Container marginTop='3px'>
					<Note bold text={<p>{errorMessage}</p>} color={Colors.errorRed} />
				</Container>
			)}
		</Fragment>
	);
};

export { FormInput, FormPasswordInput, FormDropdown, DateInput };

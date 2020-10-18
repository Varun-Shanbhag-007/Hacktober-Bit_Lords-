import React, { Fragment } from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const RadiusSlider = ({ min = 0, max = 100, step = 2, onChange, defaultValue = (min + max) / 2, setSliderValue }) => {
	const handle = (value) => {
		setSliderValue(value);
	};
	return (
		<Fragment>
			<Slider min={min} max={max} step={step} onChange={onChange} defaultValue={defaultValue} onChange={handle} />
		</Fragment>
	);
};

export default RadiusSlider;

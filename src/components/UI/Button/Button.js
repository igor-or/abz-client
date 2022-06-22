import React from 'react';

import classes from './Button.module.scss';

const Button = props => {
	return (
		<button
			type={props.type || 'button'}
			className={`${classes.button} ${classes[props.type]}`}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};

export default React.memo(Button);

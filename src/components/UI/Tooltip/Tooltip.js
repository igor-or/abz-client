import React from 'react';

import classes from './Tooltip.module.scss';

const Tooltip = props => {
    return (
        <div
            style={{ left: props.x + 'px', top: props.y + 'px' }}
            className={`${classes.tooltip} ${
                props.isVisible && classes.active
            }`}
        >
            {props.title}
        </div>
    );
};

export default Tooltip;

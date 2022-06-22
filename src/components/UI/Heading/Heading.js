import React from 'react';

import classes from './Heading.module.scss';

const Heading = props => {
    return <h1 className={classes.heading}>{props.children}</h1>;
};

export default Heading;

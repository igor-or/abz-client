import React from 'react';
import OverflowTip from '../../UI/OverflowTip/OverflowTip';
import UserPhoto from '../UserPhoto/UserPhoto';

import classes from './User.module.scss';

const User = props => {
    return (
        <div className={classes.user}>
            <UserPhoto img={props.photo}></UserPhoto>
            <OverflowTip>{props.name}</OverflowTip>
            <div>
                <OverflowTip>{props.position}</OverflowTip>
                <OverflowTip>{props.email}</OverflowTip>
                <OverflowTip>{props.phone}</OverflowTip>
            </div>
        </div>
    );
};

export default User;

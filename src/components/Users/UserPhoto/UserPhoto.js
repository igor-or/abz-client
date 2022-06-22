import React from 'react';

import classes from './UserPhoto.module.scss';

import placeholder from '../../../assets/photo-cover.svg';

const UserPhoto = props => {
    return (
        <img
            src={props.img || placeholder}
            className={classes.photo}
            alt="User"
        ></img>
    );
};

export default UserPhoto;

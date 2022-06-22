import React from 'react';

import classes from './UserList.module.scss';

import User from '../User/User';
import Button from '../../UI/Button/Button';
import Heading from '../../UI/Heading/Heading';
import Spinner from '../../UI/Spinner/Spinner';

const UserList = props => {
    let heading = 'Working with GET requets';
    let content = '';

    if (props.users.length === 0 && props.isLoading) {
        content = <Spinner />;
    }

    if (props.users.length === 0 && !props.isLoading) {
        heading = 'Found no users';
    }

    if (props.users.length !== 0) {
        content = (
            <>
                <div>
                    {props.users.map(user => (
                        <User
                            key={user.id}
                            id={user.id}
                            title={user.title}
                            name={user.name}
                            email={user.email}
                            phone={user.phone}
                            position={user.position}
                            position_id={user.position_id}
                            photo={user.photo}
                        />
                    ))}
                </div>
                {props.isLoading && <Spinner />}
                {!props.isLoading && !props.isLastPage && (
                    <Button onClick={props.onShowMore} type="wide">
                        Show More
                    </Button>
                )}
            </>
        );
    }

    return (
        <section id="users">
            <div className={classes['users-list']}>
                <Heading type="section-heading">{heading}</Heading>
                {content}
            </div>
        </section>
    );
};

export default UserList;

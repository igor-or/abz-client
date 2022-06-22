import React, { useContext } from 'react';

import classes from './HeroSection.module.scss';

import AuthContext from '../../store/auth-context';

import Heading from '../UI/Heading/Heading';
import SignupButton from '../UI/Button/SignupButton';
import LogoutButton from '../UI/Button/LogoutButton';

const HeroSection = props => {
    const authCtx = useContext(AuthContext);

    return (
        <section className={` ${classes.intro}`}>
            <div>
                <Heading>Test assigment for front-end developer</Heading>
                <p>
                    What defines a good front-end developer is one that has
                    skilled knowledge of HTML, CSS, JS with a vast understanding
                    of User design thinking as they'll be building web
                    interfaces with accessibility in mind. They should also be
                    excited to learn, as the world of Front-End Development
                    keeps evolving.
                </p>
                {!authCtx.isLoggedIn && <SignupButton />}
                {authCtx.isLoggedIn && <LogoutButton />}
            </div>
        </section>
    );
};

export default HeroSection;

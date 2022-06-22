import React, { useContext } from 'react';

import classes from './Header.module.scss';

import AuthContext from '../../store/auth-context';

import logo from '../../assets/Logo.svg';
import Button from '../UI/Button/Button';
import SignupButton from '../UI/Button/SignupButton';
import LogoutButton from '../UI/Button/LogoutButton';

const Header = props => {
    const authCtx = useContext(AuthContext);

    const refreshPage = () => {
        window.location.reload();
    };

    const scrollToUsers = () => {
        document.getElementById('users').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className={classes.header}>
            <img src={logo} alt="Logo" onClick={refreshPage} />
            <div className={classes['button-group']}>
                <Button onClick={scrollToUsers}>Users</Button>
                {!authCtx.isLoggedIn && <SignupButton />}
                {authCtx.isLoggedIn && <LogoutButton />}
            </div>
        </header>
    );
};
export default Header;

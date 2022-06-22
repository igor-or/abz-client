import React, { useReducer } from 'react';

import apiClient from '../api-client';

const AuthContext = React.createContext({
    isLoggedIn: false,
    token: '',
    onLogout: () => {},
    onLogin: () => {},
});

const loginReducer = (state, action) => {
    if (action.type === 'LOGIN') {
        return { isLoggedIn: true, token: action.token };
    }
    if (action.type === 'LOGOUT') {
        return { isLoggedIn: false, token: '' };
    }

    return { isLoggedIn: false, token: '' };
};

export const AuthContextProvider = props => {
    const [loginState, dispatchLogin] = useReducer(loginReducer, {
        isLoggedIn: false,
        token: '',
    });

    const loginHandler = async () => {
        try {
            const response = await apiClient.getToken();
            dispatchLogin({ type: 'LOGIN', token: response.token });
        } catch (error) {
            throw error;
        }
    };

    const logoutHandler = () => {
        dispatchLogin({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: loginState.isLoggedIn,
                token: loginState.token,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

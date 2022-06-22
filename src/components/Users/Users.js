import React, { useState, useEffect, useCallback, useContext } from 'react';

import AuthContext from '../../store/auth-context';

import Heading from '../UI/Heading/Heading';
import UserList from './UserList/UserList';
import AddUser from './AddUser/AddUser';

import apiClient from '../../api-client';

const Users = props => {
    const [users, setUsers] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    const authCtx = useContext(AuthContext);

    const fetchUsersHandler = useCallback(async pageUrl => {
        const isFirstPage = !pageUrl;

        setIsLoading(true);
        setError(null);

        try {
            const response = await apiClient.getUsers(pageUrl);

            const loadedUsers = [];

            response.users.forEach(user => {
                loadedUsers.push({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    position: user.position,
                    position_id: user.position_id,
                    photo: user.photo,
                });
            });

            setUsers(users => {
                if (isFirstPage) return loadedUsers;
                return [...users, ...loadedUsers];
            });
            setNextPageUrl(response.links.next_url);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);

    const addUserHandler = async user => {
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('phone', user.phone);
        formData.append('position_id', user.position_id);
        formData.append('photo', user.photo);
        try {
            await apiClient.addUser(formData, authCtx.token);
            authCtx.onLogout();
            fetchUsersHandler();
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchUsersHandler();
    }, [fetchUsersHandler]);

    if (error) {
        return <Heading>{error}</Heading>;
    }

    return (
        <>
            <UserList
                users={users}
                isLoading={isLoading}
                isLastPage={!nextPageUrl}
                onShowMore={fetchUsersHandler.bind(null, nextPageUrl)}
            />
            <AddUser onAddUser={addUserHandler} />
        </>
    );
};

export default Users;

import React, { useContext } from 'react';

import AuthContext from '../../../store/auth-context';
import Button from './Button';

const LogoutButton = props => {
    const authCtx = useContext(AuthContext);

    return <Button onClick={authCtx.onLogout}>Logout</Button>;
};

export default React.memo(LogoutButton);

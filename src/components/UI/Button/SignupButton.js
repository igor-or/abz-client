import React, {useContext}  from 'react';

import AuthContext from '../../../store/auth-context';
import Button from './Button';

const SignupButton = props => {

    const authCtx = useContext(AuthContext);

    return <Button onClick={authCtx.onLogin}>Sign up</Button>;
};

export default React.memo(SignupButton);

import React from 'react';
import { Redirect } from 'react-router-dom';

const RequireAuth = ({ isLoggedIn, children, handleSuccessfulAuth }) => {
    if (!isLoggedIn()) {
        return (
            <Redirect to="/login" handleSuccessfulAuth={handleSuccessfulAuth} />
        )
    }
    return children;
};

export default RequireAuth;

import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";

function PrivateRoute({ component: Component, ...rest }) {
    const { isLoggedIn } = React.useContext(AuthContext);
    console.log('is logged in: '+isLoggedIn);
    return (
        <Route {...rest} render={props => (
            isLoggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: "/login",
                    state: { referer: props.location }
                }} />
            )
        )} />
    )
}

export default PrivateRoute;

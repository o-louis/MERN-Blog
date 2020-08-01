import React, { useState } from 'react';
import { AuthContext } from "../context/auth";
import { Redirect, Link } from "react-router-dom";

function Logout() {
    const [logout, setLogout] = useState(false);
    const { handleLogout } = React.useContext(AuthContext);

    const loggedOut = () => {
        handleLogout();
        setLogout(false);
    }

    if (logout) {
        return <Redirect to="/" />
    }

    return (
        <li className="navbar-list-item">
            <div className="navbar-list-item-link logout" onClick={loggedOut}>
                Log out
            </div>
        </li>
    )
}

function SignUp() {
    return (
        <li className="navbar-list-item">
            <Link className="navbar-list-item-link" to="/sign_up">
                <img src="/assets/images/user.png" alt="user" />
            </Link>
        </li>
    )
}

const Navbar = () => {
    const { isLoggedIn } = React.useContext(AuthContext);
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-list-item">
                    <Link className="navbar-list-item-link" to="/">MERN Blog</Link>
                </li>

                { isLoggedIn ? <Logout /> : <SignUp /> }
            </ul>
        </nav>
    )
};

export default Navbar;
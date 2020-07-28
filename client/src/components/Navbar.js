import React from 'react';

const Navbar = (props) => {
    const { isLoggedIn } = props;
    return (
        <nav className="navbar">
            <li className="navbar-list">
                <ul className="navbar-list-item">
                    <a className="navbar-list-item-link" href="/">MERN Blog</a>
                </ul>

                {isLoggedIn ?
                    <ul className="navbar-list-item">
                        <a className="navbar-list-item-link logout" href="/" onClick={props.handleLogout}>
                            Log out
                        </a>
                    </ul>
                    :
                    <ul className="navbar-list-item">
                        <a className="navbar-list-item-link" href="/sign_up">
                            <img src="/user.png" alt="user" />
                        </a>
                    </ul>
                }
            </li>
        </nav>
    )
};

export default Navbar;
import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <a href="/">MERN Blog</a>
            <a href="/sign_up">
                <img src="./user.png" alt="user" />
            </a>
        </nav>
    )
};

export default Navbar;
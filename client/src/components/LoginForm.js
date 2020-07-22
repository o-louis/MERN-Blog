import React from 'react';

const LoginForm = (props) => {
    const {
        email,
        password,
        errorMessage
    } = props.state;

    const handleSubmit = props.handleSubmit;
    const handleChange = props.handleChange;

    return (
        <div className="connection-form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>

                <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}/>

                <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}/>

                {errorMessage !== null ? 
                <span className="connection-form-error">
                    {errorMessage}
                </span> :
                <></>}

                <input type="submit" value="Log in" className="btn-submit"/>
            </form>
        </div>
    );
}

export default LoginForm;

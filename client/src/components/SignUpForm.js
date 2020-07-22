import React from 'react';

const SignUpForm = (props) => {
    const {
        name,
        email,
        password,
        passwordConfirm,
        errorMessage
    } = props.state;

    const handleSubmit = props.handleSubmit;
    const handleChange = props.handleChange;

    return (
        <div className="connection-form">
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                id="username"
                name="name"
                placeholder="Username" 
                value={name}
                onChange={handleChange}/>

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

                <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Confirm your password"
                value={passwordConfirm}
                onChange={handleChange}/>

                {errorMessage !== null ? 
                <span className="connection-form-error">
                    {errorMessage}
                </span> :
                <></>}

                <input type="submit" value="Create account" className="btn-submit"/>
            </form>
        </div>
    );
}

export default SignUpForm;

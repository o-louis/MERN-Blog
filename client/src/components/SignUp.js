import React from 'react';
import Navbar from './Navbar';
import { createUser } from '../requests';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            email: "",
            password: "",
            passwordConfirm: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        createUser(this.state);
    }

    render() {
        return (
            <>
                <Navbar />
                <main>
                    <div className="connection-container">
                        <div className="connection-overlay">
                            <div className="connection-overlay-login">
                                <h3>Already have an account ?</h3>
                                <button>
                                    <a href="/login">Log in</a>
                                </button>
                            </div>
                        </div>

                        <div className="connection-form">
                            <h1>Sign up</h1>
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" id="username" name="name" placeholder="Username" 
                                value={this.state.name}
                                onChange={this.handleChange}/>

                                <input type="email" id="email" name="email" placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleChange}/>

                                <input type="password" id="password" name="password" placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleChange}/>

                                <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirm your password"
                                value={this.state.passwordConfirm}
                                onChange={this.handleChange}/>

                                <input type="submit" value="Create account" className="btn-submit"/>
                            </form>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}

export default SignUp;

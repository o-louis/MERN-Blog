import React from 'react';
import Navbar from './Navbar';
import { login } from '../requests';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        login(this.state);
    }

    render() {
        return (
            <>
                <Navbar />
                <main>
                    <div className="connection-container">
                        <div className="connection-overlay">
                            <div className="connection-overlay-login">
                                <h3>Don't have an account ?</h3>
                                <button>
                                    <a href="/sign_up">Sign up</a>
                                </button>
                            </div>
                        </div>

                        <div className="connection-form">
                            <h1>Login</h1>
                            <form onSubmit={this.handleSubmit}>

                                <input type="email" id="email" name="email" placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleChange}/>

                                <input type="password" id="password" name="password" placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleChange}/>

                                <input type="submit" value="Log in" className="btn-submit"/>
                            </form>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}

export default Login;

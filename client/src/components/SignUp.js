import React from 'react';
import Navbar from './Navbar';
import SignUpForm from './SignUpForm';
import { createUser } from '../requests';
import { Redirect } from 'react-router-dom';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
            redirectToReferrer: false,
            errorMessage: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        createUser(this.state).then(response => {
            if (response.data) {
                if (response.data.success) {
                    this.setState({ redirectToReferrer: true });
                } else {
                    this.setState({ errorMessage: response.data.message });
                }
            }
        });
    }

    render() {
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to="/login" message="You have been successfully registered"/>
        } else {
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
                            <SignUpForm
                                state={this.state}
                                handleSubmit={this.handleSubmit}
                                handleChange={this.handleChange}
                            />
                        </div>
                    </main>
                </>
            );
        }
    }
}

export default SignUp;

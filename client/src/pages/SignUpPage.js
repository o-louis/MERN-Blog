import React from 'react';
import SignUpForm from '../components/SignUpForm';
import { createUser } from '../global/api_user';
import { Redirect } from 'react-router-dom';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
            registered: false,
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
        createUser(this.state)
            .then(response => {
                const { data } = response;
                if (data) {
                    if (data.success) {
                        this.setState({ registered: true });
                    } else {
                        this.setState({ errorMessage: data.message });
                    }
                }
            }).catch(error => console.log(error));
    }

    render() {
        const { registered } = this.state;

        if (registered) {
            return (
                <Redirect to={{
                    pathname: "/login",
                    state: { message: "You have been successfully registered" }
                }} />
            )
        }

        return (
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
        );
    }
}

export default SignUp;

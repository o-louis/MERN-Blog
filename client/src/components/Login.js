import React from 'react';
import { login } from '../requests';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            redirectToReferrer: false,
            errorMessage: null,
            success: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        if (this.props.location && this.props.location.state) {
            this.setState({ success: this.props.location.state.message })
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        login(this.state).then(response => {
            if (response.data) {
                if (response.data.success) {
                    console.log(response.data);
                    this.props.handleSuccessfulAuth(response.data.token);
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
            return <Redirect to="/" />
        } else {
            return (
                <>
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
                            {this.state.success && <h4>{this.state.success}</h4>}
                            <LoginForm
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

export default Login;

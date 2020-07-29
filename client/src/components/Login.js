import React from 'react';
import { login } from '../requests';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';

import { AuthContext } from "../context/auth";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            login: false,
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

        const { setUserToken } = this.context;
        login(this.state).then(response => {
            const { data } = response;
            if (data) {
                if (data.success) {
                    setUserToken(data.token);
                    this.setState({ login: true });
                } else {
                    this.setState({ errorMessage: data.message });
                }
            }
        });
    }

    render() {
        const { login } = this.state;
        const referer = (this.props.location.state && this.props.location.state.referer) || '/';

        if (login) {
            return <Redirect to={referer} />
        }
        return (
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
        )
    }
}

Login.contextType = AuthContext;

export default Login;

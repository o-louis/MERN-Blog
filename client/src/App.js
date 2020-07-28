import React from "react";
import Home from "./components/Home";
import Article from "./components/Article";
import SignUp from "./components/SignUp";
import Login from "./components/Login.js";
import RequireAuth from "./auth.js";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
    }

    componentDidMount() {
        const isLoggedIn = this.isLoggedIn();
        this.setState({ loggedIn: isLoggedIn });
    }

    isLoggedIn() {
        const storedUserToken = localStorage.getItem("userToken");
        return storedUserToken ? true : false;
    }

    handleSuccessfulAuth(userToken) {
        localStorage.setItem("userToken", userToken);
        this.setState({ loggedIn: true });
    }

    render() {
        return (
            <div className="wrapper">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/sign_up" component={SignUp} />
                        <Route
                            path='/login'
                            render={(props) => (
                                <Login {...props} handleSuccessfulAuth={this.handleSuccessfulAuth} />
                            )}
                        />
                        <Route path="/article/:_id" component={Article} />

                        <RequireAuth
                            isLoggedIn={this.isLoggedIn}
                            handleSuccessfulAuth={this.handleSuccessfulAuth}>
                        </RequireAuth>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;
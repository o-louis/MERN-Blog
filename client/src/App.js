import React from "react";
import Home from "./components/Home";
import Article from "./components/Article";
import SignUp from "./components/SignUp";
import Login from "./components/Login.js";
import NewArticle from "./components/NewArticle.js";
import RequireAuth from "./auth.js";
import Navbar from "./components/Navbar.js"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        const isLoggedIn = this.isLoggedIn();
        this.setState({ loggedIn: isLoggedIn });
    }

    isLoggedIn() {
        const storedUserToken = localStorage.getItem("userToken");
        return storedUserToken ? true : false;
    }

    handleLogout(e) {
        e.preventDefault();
        localStorage.removeItem("userToken");
        this.setState({ loggedIn: false });
    }

    handleSuccessfulAuth(userToken) {
        localStorage.setItem("userToken", userToken);
        this.setState({ loggedIn: true });
    }

    render() {
        return (
            <div className="wrapper">
                <Navbar isLoggedIn={this.state.loggedIn} handleLogout={this.handleLogout} />
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
                                <Route path="/add/article" component={NewArticle} />
                        </RequireAuth>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;
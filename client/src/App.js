import React from "react";

import Home from "./components/Home";
import Article from "./components/Article";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import NewArticle from "./components/NewArticle";
import Navbar from "./components/Navbar";

import PrivateRoute from './PrivateRoute';
import { AuthContext } from "./context/auth";

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.setUserToken = this.setUserToken.bind(this);
    }

    componentDidMount() {
        const userToken = localStorage.getItem("userToken");
        const isLoggedIn = userToken ? true : false;
        this.setState({ isLoggedIn }, () => console.log("isLoggedIn : " + this.state.isLoggedIn));
    }

    handleLogout() {
        localStorage.clear("userToken");
        this.setState({ isLoggedIn: false });
    }

    setUserToken(data) {
        localStorage.setItem("userToken", data);
        this.setState({ isLoggedIn: true });
    }

    render() {
        return (
            <AuthContext.Provider
                value={{
                    isLoggedIn: this.state.isLoggedIn,
                    setUserToken: this.setUserToken,
                    handleLogout: this.handleLogout
                }} >
                <div className="wrapper">
                    <Router>
                        <Navbar />

                        <Route exact path="/" component={Home} />
                        <Route path="/sign_up" component={SignUp} />
                        <Route path='/login' component={Login} />
                        <Route path="/article/:_id" component={Article} />
                        <PrivateRoute path="/add/article" component={NewArticle} />
                    </Router>
                </div>
            </AuthContext.Provider>
        )
    }
}

export default App;
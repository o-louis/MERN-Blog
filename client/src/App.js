import React from "react";

import Navbar from "./layouts/Navbar";

import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NewArticlePage from "./pages/NewArticlePage";
import EditArticlePage from "./pages/EditArticlePage";

import { AuthContext } from "./context/auth";
import { getUserInfos } from "./global/api_user";
import PrivateRoute from './hoc/PrivateRoute';

import Loader from 'react-loader-spinner';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isLoggedIn: false,
            user: {name: "", email: ""}
        };

        this.setUser = this.setUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        const userToken = localStorage.getItem("userToken");
        const isLoggedIn = userToken ? true : false;
        this.setUser(userToken);
        this.setState({ isLoggedIn, isLoaded: true });
    }

    setUser(userToken) {
        if (userToken) {
            getUserInfos(userToken)
                .then(response => {
                    const { name, email } = response.data.infos;
                    this.setState({ user: {name, email}});
                });
        }
    }
    
    handleLogin(data) {
        localStorage.setItem("userToken", data);
        const userToken = localStorage.getItem("userToken");
        this.setUser(userToken);
        this.setState({ isLoggedIn: true });
    }

    handleLogout() {
        localStorage.clear("userToken");
        this.setState({ isLoggedIn: false });
    }

    render() {
        const styleLoader = {
            color: "#00BFFF",
            height: "50",
            width: "50"
        }

        return (
            <AuthContext.Provider
                value={{
                    user: this.state.user,
                    isLoggedIn: this.state.isLoggedIn,
                    handleLogin: this.handleLogin,
                    handleLogout: this.handleLogout
                }} >
                <div className="wrapper">
                    <Router>
                        <Navbar />
                        { this.state.isLoaded ?
                            <Routes /> 
                            : <Loader type="Oval" style={styleLoader} />
                        }
                    </Router>
                </div>
            </AuthContext.Provider>
        )
    }
}

const Routes = () => (
    <React.Fragment>
        <PrivateRoute exact path="/add/article" component={NewArticlePage} />
        <PrivateRoute path="/edit/article/:_id" component={EditArticlePage} />
        <Route exact path="/sign_up" component={SignUpPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route path="/article/:_id" component={ArticlePage} />
        <Route exact path="/" component={HomePage} />
    </React.Fragment>
)

export default App;
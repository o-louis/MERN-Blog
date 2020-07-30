import React from "react";

import Home from "./components/Home";
import Article from "./components/Article";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import NewArticle from "./components/NewArticle";
import EditArticle from "./components/EditArticle";
import Navbar from "./layouts/Navbar";

import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from "./context/auth";

import Loader from 'react-loader-spinner';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getInfos } from "./api/requests";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isLoggedIn: false,
            user: {
                name: "",
                email: ""
            }
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.setUserToken = this.setUserToken.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount() {
        const userToken = localStorage.getItem("userToken");
        const isLoggedIn = userToken ? true : false;
        this.setState({ isLoggedIn, isLoaded: true });
        this.updateUser();
    }

    handleLogout() {
        localStorage.clear("userToken");
        this.setState({ isLoggedIn: false });
    }

    setUserToken(data) {
        localStorage.setItem("userToken", data);
        this.updateUser();
        this.setState({ isLoggedIn: true });
    }

    updateUser() {
        const userToken = localStorage.getItem("userToken");
        if (userToken) {
            getInfos(userToken).then(infos => {
                const { data } = infos;
                this.setState({
                    user: {
                        name: data.infos.name,
                        email: data.infos.email
                    }
                }, () => {
                    console.log(this.state.user);
                });
            });
        }
    }

    render() {
        return (
            <AuthContext.Provider
                value={{
                    user: this.state.user,
                    isLoggedIn: this.state.isLoggedIn,
                    setUserToken: this.setUserToken,
                    handleLogout: this.handleLogout
                }} >
                <div className="wrapper">
                    <Router>
                        <Navbar />

                        {this.state.isLoaded ? (
                            <React.Fragment>
                                <Route path="/sign_up" component={SignUp} />
                                <Route exact path='/login' component={Login} />
                                <PrivateRoute exact path="/add/article" component={NewArticle} />
                                <PrivateRoute path="/edit/article/:_id" component={EditArticle} />
                                <Route path="/article/:_id" component={Article} />
                                <Route exact path="/" component={Home} />
                            </React.Fragment>
                        ) :(
                            <Loader type="Oval" color="#00BFFF" height={50} width={50} />
                        )}
                    </Router>
                </div>
            </AuthContext.Provider>
        )
    }
}

export default App;
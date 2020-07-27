import React from "react";
import Home from "./components/Home";
import Article from "./components/Article";
import SignUp from "./components/SignUp";
import Login from "./components/Login.js";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };

        this.handleSuccessfullAuth = this.handleSuccessfullAuth.bind(this);
        this.checkUserToken = this.checkUserToken.bind(this);
    }

    componentDidMount() {
        this.checkUserToken();
    }

    checkUserToken() {
        var userToken = localStorage.getItem("userToken");
        if (userToken) {
            this.setState({ loggedIn: true});
        }
    }

    handleSuccessfullAuth(userToken) {
        if (userToken) {
            localStorage.setItem("userToken", userToken);
            this.setState({ loggedIn: true});
        }
    }

    render() {
        const RequireAuth = ({ children }) => {
            var userToken = localStorage.getItem("userToken");
            if (!userToken) {
                console.log("userToken: "+userToken);
                return <Redirect to="/login" handleSuccessfullAuth={this.handleSuccessfullAuth} />
            }
            return children;
        };

        return (
            <div className="wrapper">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/sign_up" component={SignUp} />
                        <Route
                            path='/login'
                            render={(props) => (
                                <Login {...props} handleSuccessfullAuth={this.handleSuccessfullAuth} />
                            )}
                        />
                        {/* <Route path="/article/:_id" component={ () => this.checkLoginStatus(Article) } /> */}
                        <RequireAuth>
                            <Route path="/article/:_id" component={Article} />
                        </RequireAuth>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;
import React from "react";
import Home from "./components/Home";
import Article from "./components/Article";
import SignUp from "./components/SignUp";
import Login from "./components/Login.js";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <div className="wrapper">
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/sign_up" component={SignUp} />
                    <Route path="/login" component={Login} />
                    <Route path="/article/:_id" component={Article} />
                </Switch>
            </Router>
        </div>
    )
}

export default App;
import React from "react";
import Home from "./components/Home";
import Article from "./components/Article";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/article/:_id" component={Article} />
            </Switch>
        </Router>
    )
}

export default App;
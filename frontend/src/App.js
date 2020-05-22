import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import Whois from "./components/Whois";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <a href="/tutorials" className="navbar-brand">
                            ZANN
                        </a>
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={"/tutorials"} className="nav-link">
                                    Tutorials
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/add"} className="nav-link">
                                    Add Tutorial
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/whois"} className="nav-link">
                                    Whois
                                </Link>
                            </li>
                        </div>
                    </nav>

                    <div className="container mt-3">
                        <Switch>
                            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
                            <Route exact path="/add" component={AddTutorial} />
                            <Route path="/tutorials/:id" component={Tutorial} />
                            <Route path="/whois/:id" component={Whois} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
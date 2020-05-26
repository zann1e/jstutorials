import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DomainsList from "./components/DomainsList";
import Whois from "./components/Whois";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <a href="/domains" className="navbar-brand">
                            WebTul
                        </a>
                        <div className="navbar-nav mr-auto">
                        </div>
                    </nav>

                    <div className="container mt-3">
                        <Switch>
                            <Route path="/domain/:id" component={Whois} />
                            <Route path="/" component={DomainsList} />
                        </Switch>
                    </div>
                    <footer className="page-footer font-small blue">
                        <div className="footer-copyright text-center py-3">© {new Date().getFullYear()} Copyright:
                            <a href={window.location.origin}> WebTul.com</a>
                        </div>
                    </footer>
                </div>
            </Router>
        );
    }
}

export default App;
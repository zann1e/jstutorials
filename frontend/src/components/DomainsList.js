import React, { Component } from "react";
import WhoisDataService from "../services/whois.services";
import { Link } from "react-router-dom";

export default class DomainsList extends Component {
    constructor(props) {
        super(props);
        this.retrieveDomains = this.retrieveDomains.bind(this);

        this.state = {
            domains: [],
        };
    }

    componentDidMount() {
        this.retrieveDomains();
    }

    retrieveDomains() {
        WhoisDataService.getAll()
            .then(response => {
                this.setState({
                    domains: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    render() {
        const { domains } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Domains</h4>
                    <ul className="list-group">
                        {domains &&
                        domains.map((domain, index) => (
                            <li className="list-group-item"
                                key={index}
                            >
                                <Link to={`/whois/${domain.domain}`}>{domain.domain}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
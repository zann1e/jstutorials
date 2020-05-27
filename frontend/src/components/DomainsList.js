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
            <div className="row">
                <div className="col-md-12">
                    <h4>Domains</h4>
                    <div className="card-columns">
                        {domains &&
                        domains.map((domain, index) => (
                            <a href={`/domain/${domain.domain}`} className="custom-card">
                            <div className="card">
                                <img className="card-img-top" src={domain.meta.image}  />
                                <div className="card-body">
                                    <h5 className="card-title">{domain.domain}</h5>
                                </div>
                            </div>
                            </a>
                        ))}
                     </div>


                </div>
            </div>
        );
    }
}
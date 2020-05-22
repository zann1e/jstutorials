import React, { Component } from "react";
import WhoisDataService from "../services/whois.services";

export default class Whois extends Component {
    constructor(props) {
        super(props);
        this.searchWhois = this.searchWhois.bind(this);
        this.onChangeDomain = this.onChangeDomain.bind(this);
        this.proceed = this.proceed.bind(this);

        this.state = {
            domain: this.props.match.params.id,
            currentWhois: {}
        };
    }

    componentDidMount() {
        this.searchWhois(this.state.domain);
    }

    searchWhois(domain) {
        let search = domain ? domain : this.state.domain;
        WhoisDataService.get(search)
            .then(response => {
                this.setState({
                    currentWhois: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    }

    proceed() {
        this.props.history.push({
            pathname: `/whois/${this.state.domain}`
        });
        this.searchWhois();
    }

    onChangeDomain(e) {
        const domain = e.target.value;

        this.setState({
            domain: domain
        });
    }

    render() {
        const { currentWhois } = this.state;
        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Domain.com"
                            onChange={this.onChangeDomain}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.proceed}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <h1>{currentWhois.domain}</h1>
                    <pre>
                      {currentWhois.whois}
                    </pre>
                    <span>{currentWhois.updatedAt}</span>
                </div>
            </div>
            )
    }
}
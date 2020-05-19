import React, { Component } from "react";
import WhoisDataService from "../services/whois.services";

export default class Whois extends Component {
    constructor(props) {
        super(props);
        this.searchWhois = this.searchWhois.bind(this);
        this.onChangeDomain = this.onChangeDomain.bind(this);

        this.state = {
            domain: "",
            currentWhois: null
        };
    }

    searchWhois() {
        WhoisDataService.get(this.state.domain)
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
                                onClick={this.searchWhois}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <pre>
                      {currentWhois}
                    </pre>
                </div>
            </div>
            )
    }
}
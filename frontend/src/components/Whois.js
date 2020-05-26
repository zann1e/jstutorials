import React, { Component } from "react";
import WhoisDataService from "../services/whois.services";

export default class Whois extends Component {
    constructor(props) {
        super(props);
        this.searchWhois = this.searchWhois.bind(this);
        this.onChangeDomain = this.onChangeDomain.bind(this);
        this.proceed = this.proceed.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.displayHeaders = this.displayHeaders.bind(this);

        this.state = {
            domain: this.props.match.params.id,
            data: {},
            meta: {},
            headers: {},
        };
    }


    updateTitle() {
        document.title = this.state.domain + ' - ' + this.state.meta.title;
    }

    componentDidMount() {
        this.searchWhois();
        this.updateTitle();
    }

    searchWhois(domain) {
        let search = domain ? domain : this.state.domain;
        WhoisDataService.get(search)
            .then(response => {
                this.setState({
                    data: response.data,
                    meta: response.data.meta,
                    headers: response.data.meta.headers,
                });
                this.updateTitle();
            })
            .catch(e => {
                console.log(e);
            });

    }

    proceed() {
        this.props.history.push({
            pathname: `/domain/${this.state.domain}`
        });
        this.searchWhois();
        document.title = this.state.domain + " review";
    }

    onChangeDomain(e) {
        const domain = e.target.value;

        this.setState({
            domain: domain
        });
    }

    displayHeaders() {
        const { headers } = this.state.meta;
        if (headers) {
            return Object.keys(headers).map(key =>
                <li className="list-group-item"><strong>{key}</strong>: {headers[key]}</li>
            );
        }
    }

    render() {
        const { headers } = this.state.meta;
        return (
            <div>
                <div className="list row">
                    <div className="col-md-12">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">https://</span>
                            </div>
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
                        <div className="card">
                            <img className="card-img-top" src={this.state.meta.image} />
                                <div className="card-body">
                                    <h5 className="card-title">{this.state.meta.title}</h5>
                                    <p className="card-text">{this.state.meta.description}</p>
                                    <p className="card-text"><small className="text-muted">{this.state.data.domain}</small></p>
                                </div>
                    </div>
                    </div>
                </div>
                <div className="list row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header text-white bg-primary">
                                <h3>HTTP Headers</h3>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    {this.displayHeaders()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="list row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header text-white bg-dark">
                                <h3>Domain Whois</h3>
                            </div>
                            <div className="card-body">
                               <pre>
                                 {this.state.data.whois}
                               </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
    }
}
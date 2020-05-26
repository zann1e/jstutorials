import React, { Component } from "react";
import WhoisDataService from "../services/whois.services";

export default class Whois extends Component {
    constructor(props) {
        super(props);
        this.searchWhois = this.searchWhois.bind(this);
        this.onChangeDomain = this.onChangeDomain.bind(this);
        this.proceed = this.proceed.bind(this);
        this.updateTitle = this.updateTitle.bind(this);

        this.state = {
            domain: this.props.match.params.id,
            data: {},
            meta: {},
        };
        this.searchWhois();
    }

    updateTitle() {
        document.title = this.state.domain + ' - ' + this.state.meta.title;
    }

    componentDidMount() {
        this.updateTitle();
    }

    searchWhois(domain) {
        let search = domain ? domain : this.state.domain;
        WhoisDataService.get(search)
            .then(response => {
                this.setState({
                    data: response.data,
                    meta: response.data.meta,
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

    render() {
        return (
            <div>
                <div className="list row">
                    <div className="col-md-12">
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
                    <div className="col-md-8">
                        <h2>{this.state.meta.title}</h2>
                        <p>{this.state.meta.description}</p>
                    </div>
                    <div className="col-md-4">
                        <h1>{this.state.data.domain}</h1>
                        <figure className="figure">
                            <img src={this.state.meta.image}
                                 className="figure-img img-fluid rounded" alt="..." />
                            <figcaption className="figure-caption text-right">{this.state.data.domain} logo</figcaption>
                        </figure>
                    </div>
                </div>
                <div className="list row">
                    <div className="col-md-12">
                        <h3> Whois</h3>
                     <pre>
                        {this.state.data.whois}
                    </pre>
                    </div>
                </div>
            </div>
            )
    }
}
const whois = require('whois');
const db = require("../models");
const Domain = db.domains;

exports.get = (req, res) => Domain.exists({domain: req.params.id}, function (err, data) {

    console.log(data);
    if (data) {
        Domain.findOne({domain: req.params.id})
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving domain."
                });
            });
    }
    else {
        // Create a Tutorial
        whois.lookup(req.params.id, function (err, data) {
            if (data) {
                const domain = new Domain({
                    domain: req.params.id,
                    whois: data,
                });

                // Save Domain in the database
                domain.save(domain)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while saving the Domain."
                        });
                    });
            }

        });
    }

});

exports.findAll = (req, res) => {

    Domain.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

let whois = require('whois');

exports.get = (req, res) => whois.lookup(req.params.id, function(err, data) {
    res.send(data);
})
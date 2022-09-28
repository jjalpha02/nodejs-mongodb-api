Client = require('../Models/Client');

// Handle GetAll Client actions
exports.getAll = function (req, res) {
    Client.get(function (err, clients) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }
        res.json({
            status: "SUCCESS",
            message: "Clients retrieved successfully",
            data: clients
        });
    });
};

// Handle Create Client actions
exports.create = function (req, res) {
    var client = new Client();
    client.nomComplet = req.body.nomComplet ? req.body.nomComplet : client.nomComplet;
    client.email = req.body.email;
    client.numTelephone = req.body.numTelephone;
    client.genre = req.body.genre;
    
    client.save(function (err) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }
        res.json({
            status: "SUCCESS",
            message: "Client created successfully",
            data: client
        });
    })
};

// Handle GetOne Client actions
exports.getOne = function (req, res) {
    Client.findById(req.params.client_id, function (err, client) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }
        res.json({
            status: "SUCCESS",
            message: "Client got successfully",
            data: client
        });
    })
};

// Handle Update Client actions
exports.update = function (req, res) {
    Client.findById(req.params.client_id, function (err, client) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }
        client.nomComplet = req.body.nomComplet ? req.body.nomComplet : client.nomComplet;
        client.email = req.body.email;
        client.numTelephone = req.body.numTelephone;
        client.genre = req.body.genre;
        
        client.save(function (err) {
            if (err) {
                res.json({
                    status: "ERROR",
                    message: err,
                });
            }
            res.json({
                status: "SUCCESS",
                message: "Client updated successfully",
                data: client
            });
        });
    });
};

// Handle delete Client actions
exports.delete = function (req, res) {
    Client.remove({
        _id: req.params.client_id
    }, function (err, client) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }
        res.json({
            status: "SUCCESS",
            message: "Client deleted successfully",
            data: client
        });
    });
};
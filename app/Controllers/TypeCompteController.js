TypeCompte = require('../Models/TypeCompte');

// Handle GetAll TypeCompte actions
exports.getAll = function (req, res) {
    TypeCompte.get(function (err, typeComptes) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }
        res.json({
            status: "SUCCESS",
            message: "TypeComptes retrieved successfully",
            data: typeComptes
        });
    });
};

// Handle Create TypeCompte actions
exports.create = function (req, res) {
    var typeCompte = new TypeCompte();
    typeCompte.designation = req.body.designation ? req.body.designation : typeCompte.designation;
    typeCompte.code = req.body.code;
    typeCompte.taux = req.body.taux ? req.body.taux : typeCompte.taux;
    typeCompte.description = req.body.description;
    
    typeCompte.save(function (err) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }
        res.json({
            status: "SUCCESS",
            message: "TypeCompte created successfully",
            data: typeCompte
        });
    })
};

// Handle GetOne TypeCompte actions
exports.getOne = function (req, res) {
    TypeCompte.findById(req.params.type_id, function (err, typeCompte) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }
        res.json({
            status: "SUCCESS",
            message: "TypeCompte got successfully",
            data: typeCompte
        });
    })
};

// Handle Update TypeCompte actions
exports.update = function (req, res) {
    TypeCompte.findById(req.params.type_id, function (err, typeCompte) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }        
        typeCompte.designation = req.body.designation ? req.body.designation : typeCompte.designation;
        typeCompte.description = req.body.description ? req.body.description: typeCompte.description;
        
        typeCompte.save(function (err) {
            if (err) {
                res.json({
                    status: "ERROR",
                    message: err,
                });
            }
            res.json({
                status: "SUCCESS",
                message: "TypeCompte updated successfully",
                data: typeCompte
            });
        });
    });
};

// Handle delete TypeCompte actions
exports.delete = function (req, res) {
    TypeCompte.remove({
        _id: req.params.type_id
    }, function (err, typeCompte) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }
        res.json({
            status: "SUCCESS",
            message: "TypeCompte deleted successfully",
            data: typeCompte
        });
    });
};

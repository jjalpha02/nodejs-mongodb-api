Compte = require('../Models/Compte');
TypeCompte = require('../Models/TypeCompte');
CONF = require('../Configuration/Utils');

// Handle GetAll Comptes actions
exports.getAll = function (req, res) {
    Compte.get(function (err, comptes) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }
        res.json({
            status: "SUCCESS",
            message: "Comptes retrieved successfully",
            data: comptes
        });
    });
};

// Handle Create Compte actions
exports.create = function (req, res) {
    var compte = new Compte();
    compte.numAgence = req.body.numAgence ? req.body.numAgence : typeCompte.numAgence;
    compte.numCompte = req.body.numCompte;
    compte.solde = req.body.solde;
    compte.typeCompteId = req.body.typeCompteId;
    compte.clientId = req.body.clientId;
    
    compte.save(function (err) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }
        res.json({
            status: "SUCCESS",
            message: "Compte created successfully",
            data: compte
        });
    })
};

// Handle GetOne Compte actions
exports.getOne = function (req, res) {
    Compte.findById(req.params.compte_id, function (err, compte) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }
        res.json({
            status: "SUCCESS",
            message: "Compte got successfully",
            data: compte
        });
    })
};

// Handle Update Compte actions
exports.update = function (req, res) {
    Compte.findById(req.params.compte_id, function (err, compte) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }        
    compte.numAgence = req.body.numAgence ? req.body.numAgence : typeCompte.numAgence;
    compte.numCompte = req.body.numCompte;
    compte.solde = req.body.solde;
    compte.typeCompteId = req.body.typeCompteId;
    compte.clientId = req.body.clientId;
        
        compte.save(function (err) {
            if (err) {
                res.json({
                    status: "ERROR",
                    message: err,
                });
            }
            res.json({
                status: "SUCCESS",
                message: "Compte updated successfully",
                data: compte
            });
        });
    });
};

// Handle delete Compte actions
exports.delete = function (req, res) {
    Compte.remove({
        _id: req.params.compte_id
    }, function (err, compte) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }
        res.json({
            status: "SUCCESS",
            message: "Compte deleted successfully",
            data: compte
        });
    });
};

// Handle GetSolde Compte actions
exports.getSolde = function (req, res) {
    Compte.findById(req.params.compte_id, function (err, compte) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }
        res.json({
            status: "SUCCESS",
            message: "Compte Sold got successfully",
            data: compte.solde
        });
    });
};

// Handle makeWithdraw Compte actions
exports.makeWithdraw = function (req, res) {
    Compte.findById(req.params.compte_id, function (err, compte) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }
        if (compte.clientId !== req.params.client_id) {
            res.json({
                status: "ERROR",
                message: "Ce compte n'appartient pas au client sélectionné",
            });
        }
        if (compte.solde <= req.params.amount) {
            res.json({
                status: "ERROR",
                message: "Le montant à retirer est supérieur au solde du compte",
            });
        }
        compte.solde -= parseInt(req.params.amount, 10);
        compte.updatedAt = Date.now();
        
        compte.save(function (err) {
            if (err) {
                res.json({
                    status: "ERROR",
                    message: err,
                });
            }
            res.json({
                status: "SUCCESS",
                message: "Successfull withdraw",
                data: compte
            });
        });
    });
};

// Handle makeDeposit Compte actions
exports.makeDeposit = function (req, res) {
    Compte.findById(req.params.compte_id, function (err, compte) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }
        if (compte.clientId !== req.params.client_id) {
            res.json({
                status: "ERROR",
                message: "Ce compte n'appartient pas au client sélectionné",
            });
        }
        TypeCompte.findById(compte.typeCompteId, function (err, typeCompte) {
            if (err) {
                res.json({
                    status: "ERROR",
                    message: err,
                });
            }
            if (typeCompte.code !== CONF.compteEpargneCode) {
                compte.solde += parseInt(req.params.amount, 10);
            } else {
                compte.solde += parseInt(req.params.amount, 10) * (1+(typeCompte.taux / 100));
            }
            compte.updatedAt = Date.now();
            compte.save(function (err) {
                if (err) {
                    res.json({
                        status: "ERROR",
                        message: err,
                    });
                }
                res.json({
                    status: "SUCCESS",
                    message: "Successfull deposit",
                    data: compte
                });
            });
        });
    });
};


// Handle makeEqualOwnerTransfer Compte actions
exports.makeEqualOwnerTransfer = function (req, res) {
    Compte.findById(req.params.compte_id, function (err, compte) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }
        if (compte.clientId !== req.params.client_id) {
            res.json({
                status: "ERROR",
                message: "Le compte d'émission n'appartient pas au client sélectionné",
            });
        }
        if (compte.solde <= parseInt(req.params.amount, 10)) {
            res.json({
                status: "ERROR",
                message: "Le montant à retirer est supérieur au solde du compte",
            });
        }
        TypeCompte.findById(compte.typeCompteId, function (err, typeCompte) {
            if (err) {
                res.json({
                    status: "ERROR",
                    message: err,
                });
            }
            if (typeCompte.code !== CONF.compteCourantCode) {
                res.json({
                    status: "ERROR",
                    message: "Le compte sélectionné n'est pas un compte courant",
                });
            }
            Compte.findById(req.params.sec_compte_id, function (err, sec_compte) {
                if (err) {
                    res.json({
                        status: "ERROR",
                        message: err,
                    });
                }
                if (sec_compte.clientId !== req.params.client_id) {
                    res.json({
                        status: "ERROR",
                        message: "Le compte de réception n'appartient pas au client sélectionné",
                    });
                }
                TypeCompte.findById(sec_compte.typeCompteId, function (err, sec_typeCompte) {
                    if (err) {
                        res.json({
                            status: "ERROR",
                            message: err,
                        });
                    }

                    compte.solde -= parseInt(req.params.amount, 10);
                    compte.updatedAt = Date.now();

                    if (sec_typeCompte.code !== CONF.compteEpargneCode) {
                        sec_compte.solde += parseInt(req.params.amount, 10);
                    } else {
                        sec_compte.solde += parseInt(req.params.amount, 10) * (1 + (sec_typeCompte.taux / 100));
                    }
                    sec_compte.updatedAt = Date.now();
                    
                    compte.save(function (err) {
                        if (err) {
                            res.json({
                                status: "ERROR",
                                message: err,
                            });
                        }
                        sec_compte.save(function (err) {
                            if (err) {
                                res.json({
                                    status: "ERROR",
                                    message: err,
                                });
                            }
                            res.json({
                                status: "SUCCESS",
                                message: "Successfull transaction",
                                data: {
                                    emitter: compte,
                                    receiver: sec_compte
                                }
                            });
                        });
                    });
                });
            });
        });
    });
};

// Handle makeDiffOwnerTransfer Compte actions
exports.makeDiffOwnerTransfer = function (req, res) {
    Compte.findById(req.params.compte_id, function (err, compte) {
        if (err) {
            res.json({
                status: "ERROR",
                message: err,
            });
        }
        if (compte.clientId !== req.params.client_id) {
            res.json({
                status: "ERROR",
                message: "Le compte d'émission n'appartient pas au client sélectionné",
            });
        }
        var price = parseInt(req.params.amount, 10) * (1 + (CONF.transactionRate/100))
        if (compte.solde <= price) {
            res.json({
                status: "ERROR",
                message: "Le montant à retirer est supérieur au solde du compte",
            });
        }
        Compte.findById(req.params.sec_compte_id, function (err, sec_compte) {
            if (err) {
                res.json({
                    status: "ERROR",
                    message: err,
                });
            }
            if (sec_compte.clientId === req.params.client_id) {
                res.json({
                    status: "ERROR",
                    message: "Le compte de réception appartient au même client sélectionné",
                });
            }
            TypeCompte.findById(sec_compte.typeCompteId, function (err, sec_typeCompte) {
                if (err) {
                    res.json({
                        status: "ERROR",
                        message: err,
                    });
                }

                compte.solde -= parseInt(req.params.amount, 10);
                compte.updatedAt = Date.now();

                if (sec_typeCompte.code !== CONF.compteEpargneCode) {
                    sec_compte.solde += parseInt(req.params.amount, 10);
                } else {
                    sec_compte.solde += parseInt(req.params.amount, 10) * (1 + (sec_typeCompte.taux / 100));
                }
                sec_compte.updatedAt = Date.now();
                
                compte.save(function (err) {
                    if (err) {
                        res.json({
                            status: "ERROR",
                            message: err,
                        });
                    }
                    sec_compte.save(function (err) {
                        if (err) {
                            res.json({
                                status: "ERROR",
                                message: err,
                            });
                        }
                        res.json({
                            status: "SUCCESS",
                            message: "Successfull transaction",
                            data: {
                                emitter: compte,
                                receiver: sec_compte,
                                totalPrice: price,
                                transactionPrice: parseInt(req.params.amount, 10) * CONF.transactionRate/100
                            }
                        });
                    });
                });
            });
        });
    });
};

/// Verifier l'id du client avec celui du Client_id
/// Verifier le solde s'il s'agit de retrait
/// Verifier le type de compte
/// Appliquer le taux dans le cas du compte epqrgne

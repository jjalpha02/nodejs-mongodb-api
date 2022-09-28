var mongoose = require('mongoose');


var compteSchema = mongoose.Schema({
    numeroAgence: {
        type: String,
        required: true
    },
    numero_compte: {
        type: String,
        required: true
    },
    solde: {
        type: Number,
        required: true
    },
    type_compte: {
        type: String,
        enum: ['Courant', 'Epargne'],
        Default: 'Courant',
        required: true
    },
    client_id: {
        type: String,
        required: true
    },
    date_creation: {
        type: Date,
        default: Date.now
    },
});

// Export CompteSchema
var Compte = module.exports = mongoose.model('comptes', compteSchema);
module.exports.get = function (callback, limit) {
    Compte.find(callback).limit(limit);
}
var mongoose = require('mongoose');

// Setup TypeCompte Schema
var typeCompteSchema = mongoose.Schema({
    designation: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    taux: {
        type: Number,
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});

// Export TypeCompteSchema
var TypeCompte = module.exports = mongoose.model('type_comptes', typeCompteSchema);
module.exports.get = function (callback, limit) {
    TypeCompte.find(callback).limit(limit);
}

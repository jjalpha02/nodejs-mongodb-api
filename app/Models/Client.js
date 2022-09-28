var mongoose = require('mongoose');

// Setup Client Schema
var clientSchema = mongoose.Schema({
    nomComplet: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    numTelephone: {
        type: String,
        required: true
    },
    genre: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});

// Export ClientSchema
var Client = module.exports = mongoose.model('clients', clientSchema);
module.exports.get = function (callback, limit) {
    Client.find(callback).limit(limit);
}
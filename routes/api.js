let router = require('express').Router();
//Import Client Controller
var clientController = require('../app/Controllers/ClientController');
// Import TypeCompte Controller
var typeCompteController = require('../app/Controllers/TypeCompteController');
// Import TypeCompte Controller
var compteController = require('../app/Controllers/CompteController');

// Default API Response
router.get('/', function (req, res) {
    res.json({
        status: 'API is working',
        message: 'Welcome to our Restfull API'
    });
});

// Client API Routes
router.route('/clients/all').get(clientController.getAll);
router.route('/clients/create').post(clientController.create);
router.route('/clients/:client_id').get(clientController.getOne);
router.route('/clients/:client_id/update').put(clientController.update);
router.route('/clients/:client_id/delete').delete(clientController.delete);

// TypeCompte API Routes
router.route('/type_comptes/all').get(typeCompteController.getAll);
router.route('/type_comptes/create').post(typeCompteController.create);
router.route('/type_comptes/:type_id').get(typeCompteController.getOne);
router.route('/type_comptes/:type_id/update').put(typeCompteController.update);
router.route('/type_comptes/:type_id/delete').delete(typeCompteController.delete);

// Compte API Routes
router.route('/comptes/all').get(compteController.getAll);
router.route('/comptes/create').post(compteController.create);
router.route('/comptes/:compte_id').get(compteController.getOne);
router.route('/comptes/:compte_id/update').put(compteController.update);
router.route('/comptes/:compte_id/delete').delete(compteController.delete);
router.route('/comptes/:compte_id/action_getsold').get(compteController.getSolde);
router.route('/comptes/:compte_id/action_deposit/:amount/by/:client_id').put(compteController.makeDeposit);
router.route('/comptes/:compte_id/action_withdraw/:amount/by/:client_id').put(compteController.makeWithdraw);
router.route('/comptes/:compte_id/action_transfer_equal_owner/:amount/to/:sec_compte_id/by/:client_id').put(compteController.makeEqualOwnerTransfer);
router.route('/comptes/:compte_id/action_transfer_diffe_owner/:amount/to/:sec_compte_id/by/:client_id').put(compteController.makeDiffOwnerTransfer);



//Export API Routes
module.exports = router;
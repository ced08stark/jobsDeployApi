const express = require('express');
const router = express.Router();
const compagnyController = require('../controllers/companyController')
const checkAuthMiddleware = require('../middleware/check-auth');

/*  Compagny listing. */
router.post('/compagny/save',checkAuthMiddleware.checkAuth,compagnyController.save);
router.get('/compagny/all',checkAuthMiddleware.checkAuth,compagnyController.getall);
router.patch('/compagny/update/:id',checkAuthMiddleware.checkAuth,compagnyController.update);
router.delete('/compagny/delete/:id',checkAuthMiddleware.checkAuth,compagnyController.remove);
router.delete('/compagny/delete',checkAuthMiddleware.checkAuth,compagnyController.removeAll);

module.exports = router;
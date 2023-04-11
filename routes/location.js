const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController')
const checkAuthMiddleware = require('../middleware/check-auth');

/*  location listing. */
router.post('/location/save',checkAuthMiddleware.checkAuth,locationController.save);
router.get('/location/all',checkAuthMiddleware.checkAuth,locationController.getall);
router.patch('/location/update/:id',checkAuthMiddleware.checkAuth,locationController.update);
router.delete('/location/delete/:id',checkAuthMiddleware.checkAuth,locationController.remove);
router.delete('/location/delete',checkAuthMiddleware.checkAuth,locationController.removeAll);

module.exports = router;
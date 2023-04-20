const express = require('express');
const router = express.Router();
const projetController = require('../controllers/projetController')
const checkAuthMiddleware = require('../middleware/check-auth');

/*  Compagny listing. */
router.post('/projet/save',checkAuthMiddleware.checkAuth,projetController.save);
router.get('/projet/all',checkAuthMiddleware.checkAuth,projetController.getall);
router.get("/projet/jobs", projetController.getAllJobs);
router.get(
  "/projet/:id",
  projetController.getProjetById
);
router.patch('/projet/update/:id',checkAuthMiddleware.checkAuth,projetController.update);
router.delete('/projet/delete/:id',checkAuthMiddleware.checkAuth,projetController.remove);
router.delete('/projet/delete',checkAuthMiddleware.checkAuth,projetController.removeAll);
router.post('/projet/job/save',checkAuthMiddleware.checkAuth, projetController.save_job);
router.delete('/job/delete/:id',checkAuthMiddleware.checkAuth,projetController.delete_job);
router.delete('/projet/job/delete/:id',checkAuthMiddleware.checkAuth,projetController.delete_jobs);
router.patch('/job/update/:id',checkAuthMiddleware.checkAuth,projetController.update_job);


module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const consultantController = require("../controllers/consultantController");
const employerController = require("../controllers/EmployerController");
const projetController = require("../controllers/projetController");


/*  users listing. */
router.post('/registration/employer', authController.signUpEmployer);
router.post('/registration/consultant', authController.signUpConsultant);
router.post('/login', authController.login);
router.get("/user", authController.getAll);
router.get('/consultants', consultantController.getAllConsultant)
router.get("/employers", employerController.getAllEmployer);
router.get("/employer/:id", employerController.getEmployerById);
router.post("/employer", employerController.getEmployerByUserId);
router.get("/user/:id", authController.getUserById)
router.post("/projet", projetController.addProject)
router.delete("/projet/:id", projetController.deleteProject);
router.get("/projets", projetController.getAllProjet);

module.exports = router;

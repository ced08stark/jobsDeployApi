const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

/*  users listing. */
router.post('/registration/employer', authController.signUpEmployer);
router.post('/registration/consultant', authController.signUpConsultant);
router.post('/login', authController.login);

module.exports = router;

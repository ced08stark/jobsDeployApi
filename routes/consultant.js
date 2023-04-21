const express = require('express');
const router = express.Router();
const consultantController = require('../controllers/consultantController')
const checkAuthMiddleware = require('../middleware/check-auth');

/*  Compagny listing. */

router.get('/consultantInfo', consultantController.getConsultantByUserId)

router.post('/certification/save',checkAuthMiddleware.checkAuth,consultantController.saveCertification);
router.get('/certification/all',checkAuthMiddleware.checkAuth,consultantController.Certifications);
router.patch('/certification/update/:id',checkAuthMiddleware.checkAuth,consultantController.Certificationupdate);
router.delete('/certification/delete/:id',checkAuthMiddleware.checkAuth,consultantController.removeCertification);
router.delete('/certification/delete',checkAuthMiddleware.checkAuth,consultantController.removeCertifications);


router.post('/language/save',checkAuthMiddleware.checkAuth,consultantController.saveLanguage);
router.get('/language/all',checkAuthMiddleware.checkAuth,consultantController.Languages);
router.patch('/language/update/:id',checkAuthMiddleware.checkAuth,consultantController.updateLanguage);
router.delete('/language/delete/:id',checkAuthMiddleware.checkAuth,consultantController.removeLanguage);
router.delete('/language/delete',checkAuthMiddleware.checkAuth,consultantController.removeLanguages);


router.post('/skill/save',checkAuthMiddleware.checkAuth,consultantController.saveSkill);
router.get('/skill/all',checkAuthMiddleware.checkAuth,consultantController.Skills);
router.patch('/skill/update/:id',checkAuthMiddleware.checkAuth,consultantController.updateSkill);
router.delete('/skill/delete/:id',checkAuthMiddleware.checkAuth,consultantController.removeSkill);
router.delete('/skill/delete',checkAuthMiddleware.checkAuth,consultantController.removeSkills);


router.post('/softskill/save',checkAuthMiddleware.checkAuth,consultantController.saveSoftSkill);
router.get('/softskill/all',checkAuthMiddleware.checkAuth,consultantController.SoftSkills);
router.patch('/softskill/update/:id',checkAuthMiddleware.checkAuth,consultantController.updateSoftSkill);
router.delete('/softskill/delete/:id',checkAuthMiddleware.checkAuth,consultantController.removeSoftSkill);
router.delete('/softskill/delete',checkAuthMiddleware.checkAuth,consultantController.removeSoftSkills);

router.post('/experience/save',checkAuthMiddleware.checkAuth,consultantController.saveExperience);
router.get('/experience/all',checkAuthMiddleware.checkAuth,consultantController.Experiences);
router.patch('/experience/update/:id',checkAuthMiddleware.checkAuth,consultantController.updateExperience);
router.delete('/experience/delete/:id',checkAuthMiddleware.checkAuth,consultantController.removeExperience);
router.delete('/experience/delete',checkAuthMiddleware.checkAuth,consultantController.removeExperiences);


router.post('/education/save',checkAuthMiddleware.checkAuth,consultantController.saveEducation);
router.get('/education/all',checkAuthMiddleware.checkAuth,consultantController.Educations);
router.patch('/education/update/:id',checkAuthMiddleware.checkAuth,consultantController.updateEducation);
router.delete('/education/delete/:id',checkAuthMiddleware.checkAuth,consultantController.removeEducation);
router.delete('/education/delete',checkAuthMiddleware.checkAuth,consultantController.removeEducations);

module.exports = router;
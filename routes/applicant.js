const express = require("express");
const router = express.Router();
const applicantController = require("../controllers/ApplicantController");
const checkAuthMiddleware = require("../middleware/check-auth");

/*  location listing. */
router.post(
  "/applicant/save",
  checkAuthMiddleware.checkAuth,
  applicantController.save
);
router.get(
  "/applicant",
  applicantController.getApplicantByConsultant
);


module.exports = router;
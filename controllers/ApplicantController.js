const validator = require("fastest-validator");
const models = require("../models");

function getApplicantByConsultant(req, res) {
  models.Applicant.findAll({
    where: { consultantID: req.body.consultantID },
  }).then((result) => {
    if (result !== null) {
      res
        .status(200)
        .json({
          message: "get applicant succes",
          result,
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    } else {
      res.status(404).json({
        message: "not job found",
      });
    }
  });
}

function save(req, res) {
  const applicant = {
    jobID: req.body.jobID,
    consultantID: req.body.consultantID,
  };

  models.User.findByPk(req.userData.userId).then((result) => {
    if (result !== null) {
      return models.Applicant
        .create(applicant)
        .then((result) => {
          res.status(200).json({
            message: "applicant created succes",
            Applicant: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    } else {
      res.status(400).json({
        message: "Invalide User ID",
      });
    }
  });
}


 

 module.exports = {
    save: save,
    getApplicantByConsultant: getApplicantByConsultant
 }


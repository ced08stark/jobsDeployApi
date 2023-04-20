const validator = require("fastest-validator");
const models = require("../models");

function save(req, res) {
  const timesheet = {
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    status: req.body.status,
    jobID: req.body.jobID,
    percent: 0,
    consultantID: req.body.consultantID,
    flag: req.body.flag,
  };
  

  models.User.findByPk(req.userData.userId).then((result) => {
    if (result !== null) {
      return models.Timesheet.create(timesheet)
        .then((result) => {
          res.status(200).json({
            message: "timesheet created succes",
            Timesheet: result,
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


function update(req, res) {
  const timesheet = {
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    status: req.body.status,
    jobID: req.body.jobID,
    percent: req.body.percent,
    consultantID: req.body.consultantID,
    flag: req.body.flag,
  };
  
  models.Timesheet.update(timesheet, {
        where: { id: req.params.id },
      })
        .then((result) => {
          res.status(200).json({
            message: "Update succes",
            Timesheet: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
   
  };


function getall(req, res) {
   models.Timesheet.findAll({
     attributes: [
       "id",
       "start_date",
       "end_date",
       "status",
       "jobID",
       "percent",
       "consultantID",
       "flag",
     ],
   })
     .then((result) => {
       res.status(200).json({
         message: "TimeSheet succes",
         Timesheet: result,
       });
     })
     .catch((error) => {
       res.status(500).json({
         message: "Somthing went Wrong",
         error: error,
       });
     });
}


function getallByConsutant(req, res) {
  models.Timesheet.findAll({
    where: {
      consultantID: req.body.consultantID,
      jobID: req.body.jobID,
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "TimeSheet succes",
        Timesheet: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Somthing went Wrong",
        error: error,
      });
    });
} 



module.exports = {
  save: save,
  update: update,
  getall: getall,
  getallByConsutant,
};
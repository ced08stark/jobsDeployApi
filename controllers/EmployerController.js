const models = require("../models");




const getAllEmployer = (req, res) =>{
     models.Employer.findAll()
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ message: "not found data" });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "Somthing went Wrong",
          error: error,
        });
      });
}

const getEmployerById = async (req, res) => {
    const id = req.params.id
     await models.Employer.findOne({where: {id:id}})
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ message: "not found data", data: data });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "Somthing went Wrong",
          error: error,
        });
      });
};


 function getEmployerByUserId(req, res) {
   models.Employer.findOne({ where: { userID: req.body.userID } })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "not found data" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Somthing went Wrong",
        error: error,
      });
    });
}


function getEmployer(req, res) {
  models.Employer.findOne({ where: { id: req.params.id } })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "not found data" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Somthing went Wrong",
        error: error,
      });
    });
}



module.exports = {
  getAllEmployer,
  getEmployerById,
  getEmployerByUserId,
  getEmployer,
};
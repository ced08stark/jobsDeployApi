const models = require("../models");



const getAllConsultant = async (req, res) => {
  await models.Consultant.findAll()
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
};


const getConsultantById = async (req, res) => {
    const id = req.params.id;
  await models.Consultant.findOne({ where: { id: id } })
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
};


module.exports = {
  getAllConsultant,
  getConsultantById,
};
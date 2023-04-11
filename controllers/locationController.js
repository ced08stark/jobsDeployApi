const validator = require("fastest-validator");
const models = require("../models");

function save(req, res) {
  const location = {
    pays: req.body.pays,
    city: req.body.city,
    province: req.body.province,
    postal_code: req.body.postal_code,
    quater: req.body.quater,
    address_1: req.body.address_1,
    address_2: req.body.address_2,
    userID: req.userData.userId,
  };
  const schema = {
    pays: { type: "string", optional: false, max: "500" },
    city: { type: "string", optional: false, max: "500" },
    province: { type: "string", optional: false },
    postal_code: { type: "string", optional: false },
    quater: { type: "string", optional: false },
    address_1: { type: "string", optional: false },
    address_2: { type: "string", optional: false },
  };
  const v = new validator();
  const validationResponse = v.validate(location, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      error: validationResponse,
    });
  }

  models.User.findByPk(req.userData.userId).then((result) => {
    if (result !== null) {
      return models.Location.create(location)
        .then((result) => {
          res.status(200).json({
            message: "Location created succes",
            Location: result,
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

function getall(req, res) {
  models.User.findByPk(req.userData.userId).then((result) => {
    if (result !== null) {
      return models.Location.findAll({
        where: { userID: result.id },
        attributes: [
          "pays",
          "city",
          "province",
          "quater",
          "postal_code",
          "quater",
          "address_1",
          "address_2",
        ],
      })
        .then((result) => {
          res.status(200).json({
            message: "Locations succes",
            Location: result,
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

function removeAll(req, res) {
  models.User.findByPk(req.userData.userId).then((result) => {
    if (result !== null) {
      return models.Location.destroy({
        where: { userID: result.id },
      })
        .then((result) => {
          res.status(200).json({
            message: "Delete succes",
            Location: result,
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

function remove(req, res) {
  const id = req.params.id;
  models.User.findByPk(req.userData.userId).then((result) => {
    if (result !== null) {
      return models.Location.destroy({
        where: { userID: result.id, id: id },
      })
        .then((result) => {
          res.status(200).json({
            message: "Delete succes",
            Location: result,
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
  const updatelocation = {
    pays: req.body.pays,
    city: req.body.city,
    province: req.body.province,
    postal_code: req.body.postal_code,
    quater: req.body.quater,
    address_1: req.body.address_1,
    address_2: req.body.address_2,
  };
  const schema = {
    pays: { type: "string", optional: false, max: "500" },
    city: { type: "string", optional: false, max: "500" },
    province: { type: "string", optional: false },
    postal_code: { type: "string", optional: false },
    quater: { type: "string", optional: false },
    address_1: { type: "string", optional: false },
    address_2: { type: "string", optional: false },
  };
  const v = new validator();
  const validationResponse = v.validate(updatelocation, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      error: validationResponse,
    });
  }

  models.User.findByPk(req.userData.userId).then((result) => {
    if (result !== null) {
      return models.Location.update(updatelocation, {
        where: { id: req.params.id, userID: result.id },
      })
        .then((result) => {
          res.status(200).json({
            message: "Update succes",
            Location: result,
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
  getall: getall,
  remove: remove,
  removeAll: removeAll,
  update: update,
};
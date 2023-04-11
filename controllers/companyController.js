const validator = require("fastest-validator");
const models = require("../models");

function save(req, res) {
  models.Employer.findOne({ where: { userID: req.userData.userId } })
    .then((result) => {
      const compagny = {
        name: req.body.name,
        logo: req.body.logo,
        description: req.body.description,
        email: req.body.email,
        facebookLK: req.body.facebookLK,
        twitterLK: req.body.twitterLK,
        instagramLK: req.body.instagramLK,
        culture: req.body.culture,
        industry_type: req.body.industry_type,
        size: req.body.size,
        website: req.body.website,
        employerID: result.id,
      };
      const schema = {
        name: { type: "string", optional: false, max: "200" },
        logo: { type: "string", optional: false, max: "2000" },
        description: { type: "string", optional: false, max: "100" },
        email: { type: "string", optional: false },
        facebookLK: { type: "string", optional: false },
        twitterLK: { type: "string", optional: false },
        instagramLK: { type: "string", optional: false },
        culture: { type: "string", optional: false },
        industry_type: { type: "string", optional: false },
        size: { type: "string", optional: false },
        website: { type: "string", optional: false },
      };
      const v = new validator();
      const validationResponse = v.validate(compagny, schema);

      if (validationResponse !== true) {
        return res.status(400).json({
          message: "Validation failed",
          error: validationResponse,
        });
      }

      return models.Compagny.findOne({ where: { email: compagny.email } }).then(
        (result) => {
          if (result) {
            res.status(409).json({
              message: "Email already Existe",
            });
          } else {
            return models.Compagny.create(compagny)
              .then((result) => {
                res.status(200).json({
                  message: "Compagny created succes",
                  Company: result,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: "Somthing went Wrong",
                  error: error,
                });
              });
          }
        }
      );
    })
    .catch((error) => {
      res.status(500).json({
        message: "Somthing went Wrong",
        error: error,
      });
    });
}

function getall(req, res) {
  models.Employer.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      if (result !== null) {
        return models.Compagny.findAll({
          where: { employerID: result.id },
          attributes: [
            "id",
            "name",
            "logo",
            "description",
            "email",
            "culture",
            "industry_type",
            "size",
            "website",
            "facebookLK",
            "twitterLK",
            "instagramLK",
          ],
        })
          .then((result) => {
            res.status(200).json({
              message: "Compagnies succes",
              Compagny: result,
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
    }
  );
}

function removeAll(req, res) {
  models.Employer.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      if (result !== null) {
        return models.Compagny.destroy({
          where: { employerID: result.id },
        })
          .then((result) => {
            res.status(200).json({
              message: "Delete succes",
              Compagny: result,
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
    }
  );
}

function remove(req, res) {
  const id = req.params.id;
  models.Employer.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      if (result !== null) {
        return models.Compagny.destroy({
          where: { employerID: result.id, id: id },
        })
          .then((result) => {
            res.status(200).json({
              message: "Delete succes",
              Compagny: result,
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
    }
  );
}

function update(req, res) {
  models.Employer.findOne({ where: { userID: req.userData.userId } })
    .then((resultE) => {
      let compagnyUpdate = {
        name: req.body.name,
        logo: req.body.logo,
        description: req.body.description,
        email: req.body.email,
        facebookLK: req.body.facebookLK,
        twitterLK: req.body.twitterLK,
        instagramLK: req.body.instagramLK,
        culture: req.body.culture,
        industry_type: req.body.industry_type,
        size: req.body.size,
        website: req.body.website,
      };
      const schema = {
        name: { type: "string", optional: false, max: "200" },
        logo: { type: "string", optional: false, max: "2000" },
        description: { type: "string", optional: false, max: "100" },
        email: { type: "string", optional: false },
        facebookLK: { type: "string", optional: false },
        twitterLK: { type: "string", optional: false },
        instagramLK: { type: "string", optional: false },
        culture: { type: "string", optional: false },
        industry_type: { type: "string", optional: false },
        size: { type: "string", optional: false },
        website: { type: "string", optional: false },
      };
      const v = new validator();
      const validationResponse = v.validate(compagnyUpdate, schema);

      if (validationResponse !== true) {
        return res.status(400).json({
          message: "Validation failed",
          error: validationResponse,
        });
      }

      models.Compagny.findByPk(req.params.id).then((result) => {
        if (result.email === compagnyUpdate.email) {
          compagnyUpdate.email = result.email;
          return models.Compagny.update(compagnyUpdate, {
            where: { id: result.id, employerID: resultE.id },
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
        }
        if (result.email !== compagnyUpdate.email) {
          return models.Compagny.findOne({
            where: { email: compagnyUpdate.email },
          }).then((resultc) => {
            if (resultc) {
              res.status(409).json({
                message: "Email already Existe",
              });
            } else {
              return models.Compagny.update(compagnyUpdate, {
                where: { id: result.id, employerID: resultE.id },
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
            }
          });
        }
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
  getall: getall,
  remove: remove,
  removeAll: removeAll,
  update: update,
};

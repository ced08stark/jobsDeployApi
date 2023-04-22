const models = require("../models");
const validator = require("fastest-validator");

const getAllProjet = async (req, res) => {
  await models.Projet.findAll()
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

async function addProject(req, res) {
    const projet = {
      name: req.body.name,
      description: req.body.description,
      employerID: req.body.employerID,
    };
    await models
    .Projet
    .create(projet)
    .then(
        result => 
        {
            res.status(200).json({
            message: "projet created succes",
            result: result
            });
        }
    )
    .catch(error=>{
                res.status(500).json({
                message: "Somthing went Wrong",
                error: error
                });
        });
    }

async function deleteProject(req, res) {
  const id = req.params.id;
   await models.Projet.destroy({where: {id:id}})
    .then((result) => {
      res.status(200).json({
        message: "projet delete succes",
        result: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Somthing went Wrong",
        error: error,
      });
    });
}

function save(req, res) {
  models.Employer.findOne({ where: { userID: req.userData.userId } })
    .then((result) => {
      const projet = {
        name: req.body.name,
        logo: req.body.logo,
        description: req.body.description,
        employerID: result.id,
      };
      const schema = {
        name: { type: "string", optional: false, max: "500" },
        logo: { type: "string", optional: true, max: "2000" },
        description: { type: "string", optional: false },
      };
      const v = new validator();
      const validationResponse = v.validate(projet, schema);

      if (validationResponse !== true) {
        return res.status(400).json({
          message: "Validation failed",
          error: validationResponse,
        });
      }

      return models.Projet.create(projet)
        .then((result) => {
          res.status(200).json({
            message: "Projet created succes",
            Projet: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
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
        return models.Projet.findAll({
          where: { employerID: result.id },
          attributes: ["id", "name", "logo", "description"],
        })
          .then((result) => {
            res.status(200).json({
              message: "Projet succes",
              Projet: result,
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


function getProjetById(req, res) {
 models.Projet.findOne({
          where: { id: req.params.id },
          attributes: ["id", "name", "logo", "description", "employerID"],
        })
          .then((result) => {
            res.status(200).json({
              message: "Projet succes",
              Projet: result,
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: "Somthing went Wrong",
              error: error,
        });
  });
} 
    


function removeAll(req, res) {
  models.Employer.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      if (result !== null) {
        return models.Projet.destroy({
          where: { employerID: result.id },
        })
          .then((result) => {
            res.status(200).json({
              message: "Delete succes",
              Projet: result,
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
        return models.Projet.destroy({
          where: { employerID: result.id, id: id },
        })
          .then((result) => {
            res.status(200).json({
              message: "Delete succes",
              Projet: result,
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
    .then((result) => {
      let projetUpdate = {
        name: req.body.name,
        logo: req.body.logo,
        description: req.body.description,
      };
      const schema = {
        name: { type: "string", optional: false, max: "200" },
        logo: { type: "string", optional: true, max: "2000" },
        description: { type: "string", optional: false, max: "100" },
      };
      const v = new validator();
      const validationResponse = v.validate(projetUpdate, schema);

      if (validationResponse !== true) {
        return res.status(400).json({
          message: "Validation failed",
          error: validationResponse,
        });
      }

      return models.Projet.update(projetUpdate, {
        where: { id: req.params.id, employerID: result.id },
      })
        .then((result) => {
          res.status(200).json({
            message: "Update succes",
            Projet: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Somthing went Wrong",
        error: error,
      });
    });
}


 function getAllJobs(req, res) {
  models.Job.findAll().then(
    result => {
      if (result !== null) {
            res.status(200).json({
              message: "get jobs succes",
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
  })
}


 function getJobsById(req, res) {
   models.Job.findOne({where: {id : req.params.id}}).then((result) => {
     if (result !== null) {
       res
         .status(200)
         .json({
           message: "get jobs succes",
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


 async function save_job(req, res) {
  console.log(req.body)
  const job = {
    name: req.body.name,
    logo: req.body.logo,
    description: req.body.description,
    type: req.body.type,
    livrable_date: req.body.livrable_date,
    experience: req.body.description,
    skill: req.body.skill,
    certification: req.body.certification,
    langue: req.body.langue,
    contratType: req.body.contratType,
    workPreference: req.body.workPreference,
    delay: req.body.delay,
    file: req.body.file,
    montant: req.body.montant,
    projetID: req.body.projetID
  };
  const schema = {
    name: { type: "string", optional: false, max: "500" },
    logo: { type: "string", optional: true, max: "2000" },
    description: { type: "string", optional: false, max: "1000" },
    livrable_date: { type: "string", optional: false },

  };
  const v = new validator();
  const validationResponse = v.validate(job, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      error: validationResponse,
    });
  }

   await  models.Job.create(job)
    .then((result) => {
      res.status(200).json({
        message: "Job created succes",
        Job: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Somthing went Wrong",
        error: error,
      });
    });
}

function delete_job(req, res) {
  return models.Job.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.status(200).json({
        message: "Job deleted succes",
        Job: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Somthing went Wrong",
        error: error,
      });
    });
}

function delete_jobs(req, res) {
  models.Job.destroy({ where: { projetID: req.params.id } })
    .then((result) => {
      res.status(200).json({
        message: "Jobs deleted succes",
        Jobs: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Somthing went Wrong",
        error: error,
      });
    });
}

function update_job(req, res) {
  const jobUpdate = {
    name: req.body.name,
    logo: req.body.logo,
    description: req.body.description,
    type: req.body.type,
    livrable_date: req.body.livrable_date,
  };
  const schema = {
    name: { type: "string", optional: false, max: "500" },
    logo: { type: "string", optional: false, max: "2000" },
    description: { type: "string", optional: false, max: "100" },
    type: { type: "string", optional: false },
    livrable_date: { type: "string", optional: false },
  };
  const v = new validator();
  const validationResponse = v.validate(jobUpdate, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      error: validationResponse,
    });
  }

  return models.Job.update(jobUpdate, {
    where: { id: req.params.id },
  })
    .then((result) => {
      res.status(200).json({
        message: "Update succes",
        Job: result,
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
  deleteProject,
  addProject,
  getAllProjet: getAllProjet,
  save: save,
  getall: getall,
  remove: remove,
  removeAll: removeAll,
  update: update,
  save_job: save_job,
  delete_job: delete_job,
  delete_jobs: delete_jobs,
  update_job: update_job,
  getAllJobs: getAllJobs,
  getProjetById,
  getJobsById,
};

                 
    

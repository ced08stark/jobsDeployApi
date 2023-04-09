const models = require("../models");

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
   await models.Projet.delete({where: {id:id}})
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


module.exports = {
    deleteProject,
    addProject,
    getAllProjet:getAllProjet
}

                 
    

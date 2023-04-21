const models = require("../models");


function getConsultantByUserId(req, res) {
  models.Consultant.findOne({ where: { userID: req.body.userID } })
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


function saveCertification(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } })
    .then((result) => {
      const certification = {
        name: req.body.name,
        certificationUrl: req.body.certificationUrl,
        picture: req.body.picture,
        etablissement: req.body.etablissement,
        obtention_date: req.body.obtention_date,
        consultantID: result.id,
      };
      const schema = {
        name: { type: "string", optional: false, max: "200" },
        certificationUrl: { type: "string", optional: false, max: "200" },
        picture: { type: "string", optional: false, max: "100", max: "2000" },
        etablissement: { type: "string", optional: false },
        obtention_date: { type: "string", optional: false },
      };
      const v = new validator();
      const validationResponse = v.validate(certification, schema);

      if (validationResponse !== true) {
        return res.status(400).json({
          message: "Validation failed",
          error: validationResponse,
        });
      }

      return models.Certification.create(certification)
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
    })
    .catch((error) => {
      res.status(500).json({
        message: "Somthing went Wrong",
        error: error,
      });
    });
}

function Certificationupdate(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      const certification = {
        name: req.body.name,
        certificationUrl: req.body.certificationUrl,
        picture: req.body.picture,
        etablissement: req.body.etablissement,
        obtention_date: req.body.obtention_date,
      };
      const schema = {
        name: { type: "string", optional: false, max: "200" },
        certificationUrl: { type: "string", optional: false, max: "200" },
        picture: { type: "string", optional: false, max: "100", max: "2000" },
        etablissement: { type: "string", optional: false },
        obtention_date: { type: "string", optional: false },
      };
      const v = new validator();
      const validationResponse = v.validate(certification, schema);

      if (validationResponse !== true) {
        return res.status(400).json({
          message: "Validation failed",
          error: validationResponse,
        });
      }

      return models.Certification.update(certification, {
        where: { id: req.params.id, consultantID: result.id },
      })
        .then((result) => {
          res.status(200).json({
            message: "Certification updated succes",
            Certification: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    }
  );
}

function removeCertification(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      return models.Certification.destroy({
        where: { id: req.params.id, consultantID: result.id },
      })
        .then((result) => {
          res.status(200).json({
            message: "Certification deleted succes",
            Certifaction: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    }
  );
}

function removeCertifications(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      return models.Certification.destroy({
        where: { consultantID: result.id },
      })
        .then((result) => {
          res.status(200).json({
            message: "Certification deleted succes",
            Certifaction: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    }
  );
}

function Certifications(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      return models.Certification.findAll({
        where: { consultantID: result.id },
        attributes: [
          "id",
          "name",
          "picture",
          "certificationUrl",
          "etablissement",
          "obtention_date",
        ],
      })
        .then((result) => {
          res.status(200).json({
            message: "Certification all succes",
            Certifactions: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    }
  );
}

function saveLanguage(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } })
    .then((result) => {
      const language = {
        name: req.body.name,
        logo: req.body.logo,
        consultantID: result.id,
      };
      const schema = {
        name: { type: "string", optional: false, max: "200" },
        logo: { type: "string", optional: false, max: "200" },
      };
      const v = new validator();
      const validationResponse = v.validate(language, schema);

      if (validationResponse !== true) {
        return res.status(400).json({
          message: "Validation failed",
          error: validationResponse,
        });
      }

      return models.Language.create(language)
        .then((result) => {
          res.status(200).json({
            message: "Language created succes",
            Language: result,
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

function updateLanguage(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } })
    .then((result) => {
      const language = {
        name: req.body.name,
        logo: req.body.logo,
      };
      const schema = {
        name: { type: "string", optional: false, max: "200" },
        logo: { type: "string", optional: false, max: "200" },
      };
      const v = new validator();
      const validationResponse = v.validate(language, schema);

      if (validationResponse !== true) {
        return res.status(400).json({
          message: "Validation failed",
          error: validationResponse,
        });
      }

      return models.Language.update(language, {
        where: { id: req.params.id, consultantID: result.id },
      })
        .then((result) => {
          res.status(200).json({
            message: "Language updated succes",
            Language: result,
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

function removeLanguage(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      return models.Language.destroy({
        where: { id: req.params.id, consultantID: result.id },
      })
        .then((result) => {
          res.status(200).json({
            message: "Language deleted succes",
            Language: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    }
  );
}

function removeLanguages(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      return models.Language.destroy({ where: { consultantID: result.id } })
        .then((result) => {
          res.status(200).json({
            message: "Languages deleted succes",
            Languages: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    }
  );
}

function Languages(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      return models.Language.findAll({
        where: { consultantID: result.id },
        attributes: ["id", "name", "logo"],
      })
        .then((result) => {
          res.status(200).json({
            message: "Languages all succes",
            Languages: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    }
  );
}

function saveSkill(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } })
    .then((result) => {
      const skill = {
        name: req.body.name,
        consultantID: result.id,
      };
      const schema = {
        name: { type: "string", optional: false, max: "200" },
      };
      const v = new validator();
      const validationResponse = v.validate(skill, schema);

      if (validationResponse !== true) {
        return res.status(400).json({
          message: "Validation failed",
          error: validationResponse,
        });
      }

      return models.Skill.create(skill)
        .then((result) => {
          res.status(200).json({
            message: "Skill created succes",
            Skill: result,
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

function updateSkill(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } })
    .then((result) => {
      const skill = {
        name: req.body.name,
      };
      const schema = {
        name: { type: "string", optional: false, max: "200" },
      };
      const v = new validator();
      const validationResponse = v.validate(skill, schema);

      if (validationResponse !== true) {
        return res.status(400).json({
          message: "Validation failed",
          error: validationResponse,
        });
      }

      return models.Skill.update(skill, {
        where: { id: req.params.id, consultantID: result.id },
      })
        .then((result) => {
          res.status(200).json({
            message: "Skill updated succes",
            Skill: result,
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

function removeSkill(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      return models.Skill.destroy({
        where: { id: req.params.id, consultantID: result.id },
      })
        .then((result) => {
          res.status(200).json({
            message: "Skill deleted succes",
            Skill: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    }
  );
}

function removeSkills(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      return models.Skill.destroy({ where: { consultantID: result.id } })
        .then((result) => {
          res.status(200).json({
            message: "Skills deleted succes",
            Skills: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    }
  );
}

function Skills(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      return models.Skill.findAll({
        where: { consultantID: result.id },
        attributes: ["id", "name"],
      })
        .then((result) => {
          res.status(200).json({
            message: "Skills all succes",
            Skill: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    }
  );
}

function saveSoftSkill(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } })
    .then((result) => {
      const softskill = {
        name: req.body.name,
        consultantID: result.id,
      };
      const schema = {
        name: { type: "string", optional: false, max: "200" },
      };
      const v = new validator();
      const validationResponse = v.validate(softskill, schema);

      if (validationResponse !== true) {
        return res.status(400).json({
          message: "Validation failed",
          error: validationResponse,
        });
      }

      return models.SoftSkill.create(softskill)
        .then((result) => {
          res.status(200).json({
            message: "SoftSkill created succes",
            SoftSkill: result,
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

function updateSoftSkill(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } })
    .then((result) => {
      const softskill = {
        name: req.body.name,
      };
      const schema = {
        name: { type: "string", optional: false, max: "200" },
      };
      const v = new validator();
      const validationResponse = v.validate(softskill, schema);

      if (validationResponse !== true) {
        return res.status(400).json({
          message: "Validation failed",
          error: validationResponse,
        });
      }

      return models.SoftSkill.update(softskill, {
        where: { id: req.params.id, consultantID: result.id },
      })
        .then((result) => {
          res.status(200).json({
            message: "SoftSkill updated succes",
            SoftSkill: result,
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

function removeSoftSkill(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      return models.SoftSkill.destroy({
        where: { id: req.params.id, consultantID: result.id },
      })
        .then((result) => {
          res.status(200).json({
            message: "SoftSkill deleted succes",
            SoftSkill: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    }
  );
}

function removeSoftSkills(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      return models.SoftSkill.destroy({ where: { consultantID: result.id } })
        .then((result) => {
          res.status(200).json({
            message: "SoftSkills deleted succes",
            SoftSkill: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    }
  );
}

function SoftSkills(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      return models.SoftSkill.findAll({
        where: { consultantID: result.id },
        attributes: ["id", "name"],
      })
        .then((result) => {
          res.status(200).json({
            message: "SoftSkills all succes",
            SoftSkill: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    }
  );
}

function saveExperience(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } })
    .then((result) => {
      const experience = {
        start_date: req.body.start_date,
        compagny_name: req.body.compagny_name,
        description: req.body.description,
        logo: req.body.logo,
        isCurrent: false,
        consultantID: result.id,
      };
      const schema = {
        compagny_name: { type: "string", optional: false, max: "200" },
        description: { type: "string", optional: false, max: "200" },
        logo: { type: "string", optional: false, max: "2000" },
        start_date: { type: "string", optional: false, max: "200" },
      };
      const v = new validator();
      const validationResponse = v.validate(experience, schema);

      if (validationResponse !== true) {
        return res.status(400).json({
          message: "Validation failed",
          error: validationResponse,
        });
      }

      return models.Experience.create(experience)
        .then((result) => {
          res.status(200).json({
            message: "Experience created succes",
            Experience: result,
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

function updateExperience(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } })
    .then((result) => {
      const experience = {
        start_date: req.body.start_date,
        compagny_name: req.body.compagny_name,
        description: req.body.description,
        logo: req.body.logo,
        isCurrent: false,
        consultantID: result.id,
      };
      const schema = {
        name: { type: "string", optional: false, max: "200" },
        compagny_name: { type: "string", optional: false, max: "200" },
        description: { type: "string", optional: false, max: "200" },
        logo: { type: "string", optional: false, max: "2000" },
        start_date: { type: "string", optional: false, max: "200" },
      };
      const v = new validator();
      const validationResponse = v.validate(experience, schema);

      if (validationResponse !== true) {
        return res.status(400).json({
          message: "Validation failed",
          error: validationResponse,
        });
      }

      return models.Experience.update(experience, {
        where: { id: req.params.id, consultantID: result.id },
      })
        .then((result) => {
          res.status(200).json({
            message: "Experience updated succes",
            Experience: result,
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

function removeExperience(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      return models.Experience.destroy({
        where: { id: req.params.id, consultantID: result.id },
      })
        .then((result) => {
          res.status(200).json({
            message: "Experience deleted succes",
            Experience: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    }
  );
}

function removeExperiences(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      return models.Experience.destroy({ where: { consultantID: result.id } })
        .then((result) => {
          res.status(200).json({
            message: "Experiences deleted succes",
            Experience: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    }
  );
}

function Experiences(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      return models.Experience.findAll({
        where: { consultantID: result.id },
        attributes: [
          "id",
          "compagny_name",
          "description",
          "logo",
          "start_date",
          "isCurrent",
        ],
      })
        .then((result) => {
          res.status(200).json({
            message: "Experience all succes",
            Experience: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    }
  );
}

function saveEducation(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } })
    .then((result) => {
      const education = {
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        etablissement: req.body.etablissement,
        diplome: req.body.diplome,
        logo: req.body.logo,
        consultantID: result.id,
      };
      const schema = {
        diplome: { type: "string", optional: false, max: "2000" },
        etablissement: { type: "string", optional: false, max: "200" },
        logo: { type: "string", optional: false, max: "2000" },
        start_date: { type: "string", optional: false, max: "200" },
        end_date: { type: "string", optional: false, max: "200" },
      };
      const v = new validator();
      const validationResponse = v.validate(education, schema);

      if (validationResponse !== true) {
        return res.status(400).json({
          message: "Validation failed",
          error: validationResponse,
        });
      }

      return models.Education.create(education)
        .then((result) => {
          res.status(200).json({
            message: "Education created succes",
            Education: result,
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

function updateEducation(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } })
    .then((result) => {
      const education = {
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        etablissement: req.body.etablissement,
        diplome: req.body.diplome,
        logo: req.body.logo,
        consultantID: result.id,
      };
      const schema = {
        diplome: { type: "string", optional: false, max: "2000" },
        etablissement: { type: "string", optional: false, max: "200" },
        logo: { type: "string", optional: false, max: "2000" },
        start_date: { type: "string", optional: false, max: "200" },
        end_date: { type: "string", optional: false, max: "200" },
      };
      const v = new validator();
      const validationResponse = v.validate(education, schema);

      if (validationResponse !== true) {
        return res.status(400).json({
          message: "Validation failed",
          error: validationResponse,
        });
      }

      return models.Education.update(education, {
        where: { id: req.params.id, consultantID: result.id },
      })
        .then((result) => {
          res.status(200).json({
            message: "Education updated succes",
            Education: result,
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

function removeEducation(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      return models.Education.destroy({
        where: { id: req.params.id, consultantID: result.id },
      })
        .then((result) => {
          res.status(200).json({
            message: "Education deleted succes",
            Education: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    }
  );
}

function removeEducations(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      return models.Education.destroy({ where: { consultantID: result.id } })
        .then((result) => {
          res.status(200).json({
            message: "Educations deleted succes",
            Education: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    }
  );
}

function Educations(req, res) {
  models.Consultant.findOne({ where: { userID: req.userData.userId } }).then(
    (result) => {
      return models.Education.findAll({
        where: { consultantID: result.id },
        attributes: [
          "id",
          "diplome",
          "etablissement",
          "logo",
          "start_date",
          "end_date",
        ],
      })
        .then((result) => {
          res.status(200).json({
            message: "Education all succes",
            Education: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Somthing went Wrong",
            error: error,
          });
        });
    }
  );
}


module.exports = {
  getAllConsultant,
  getConsultantById,
  saveCertification,
  Certifications,
  removeCertification,
  removeCertifications,
  Certificationupdate,

  saveLanguage: saveLanguage,
  updateLanguage: updateLanguage,
  removeLanguage: removeLanguage,
  removeLanguages: removeLanguages,
  Languages: Languages,

  saveSkill: saveSkill,
  updateSkill: updateSkill,
  removeSkill: removeSkill,
  removeSkills: removeSkills,
  Skills: Skills,

  saveSoftSkill: saveSoftSkill,
  updateSoftSkill: updateSoftSkill,
  removeSoftSkill: removeSoftSkill,
  removeSoftSkills: removeSoftSkills,
  SoftSkills: SoftSkills,

  saveExperience: saveExperience,
  updateExperience: updateExperience,
  removeExperience: removeExperience,
  removeExperiences: removeExperiences,
  Experiences: Experiences,

  saveEducation: saveEducation,
  updateEducation: updateEducation,
  removeEducation: removeEducation,
  removeEducations: removeEducations,
  Educations: Educations,
  getConsultantByUserId: getConsultantByUserId
};
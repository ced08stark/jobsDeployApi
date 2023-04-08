const models = require('../models');

const validator = require('fastest-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


function signUpEmployer(req, res){
    models.User.findOne({where:{email:req.body.email}}).then(result=>{
        if(result){
            res.status(409).json({
               message: "Email already Existe"
            });
        }else {
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash( req.body.password, salt, function(error, hash){
                    const user = {
                        email: req.body.email,
                        password: hash,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        profile: req.body.profile,
                        phone: req.body.phone,
                        gender: req.body.gender
                    }
                    models.User.create(user).then(
                        result => {
                            const user = result
                                return models.Employer.create({
                                    role: req.body.role
                                }).then(
                                        result =>{
                                            user.setEmployer(result)
                                               res.status(200).json({
                                                message: "User created succes",
                                                user: result
                                            });
                                    }
                                ).catch(error=>{
                                    res.status(500).json({
                                        message: "Somthing went Wrong",
                                        error: error
                                    });
                                });
                        }
                    ).catch(error=>{
                        res.status(500).json({
                            message: "Somthing went Wrong",
                            error: error
                        });
                    });
                });
            })
        }
    }).catch(error=>{
        res.status(500).json({
            message: "Somthing went Wrong",
            error: error
        });
    })
}

function signUpConsultant(req, res){

    models.User.findOne({where:{email:req.body.email}}).then(result=>{
        if(result){
            res.status(409).json({
                message: "Email already Existe"
            });
        }else {
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash( req.body.password, salt, function(error, hash){
                    const user = {
                        email: req.body.email,
                        password: hash,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        profile: req.body.profile,
                        phone: req.body.phone,
                        gender: req.body.gender
                    }
                    models.User.create(user).then(
                        result => {
                            const user = result
                            return models.Consultant.create({
                                role: req.body.role,
                                remunaration: req.body.remunaration,
                                pseudo: req.body.pseudo
                            }).then(
                                result =>{
                                    user.setConsultant(result)
                                    res.status(200).json({
                                        message: "User created succes",
                                        user: result
                                    });
                                }
                            ).catch(error=>{
                                res.status(500).json({
                                    message: "Somthing went Wrong",
                                    error: error
                                });
                            });
                        }
                    ).catch(error=>{
                        res.status(500).json({
                            message: "Somthing went Wrong",
                            error: error
                        });
                    });
                });
            })
        }
    }).catch(error=>{
        res.status(500).json({
            message: "Somthing went Wrong",
            error: error
        });
    })
}

async function getAll(req, res){
   await models.User.findAll()
      .then((data) =>{ 
      if(data){
        res.status(200).json(data);
      }
      else{
        res.status(404).json({ message: "not found data" });
      }
      }
      )
      .catch((error) => {
        res.status(500).json({
          message: "Somthing went Wrong",
          error: error,
        });
      });
}



async function login(req, res){
   await models.User.findOne(
        {where:{email: req.body.email}}
    ).then(user=>{
            if(user == null){
                console.log(res)
                res.status(401).json({
                    message:"User Doesn't exist"
                });
            }else {
                bcrypt.compare(req.body.password, user.password, function (err, result) {

                    if ( result ){
                        const token = jwt.sign({
                            email: user.email,
                            userId: user.id
                        }, 'secret', function(error, token){
                            res.status(200).json({
                                message: " Authentication successful",
                                user:user,
                                token: token
                            });
                        });
                    }else {
                        res.status(401).json({
                            message:"Invalid credential"
                        });
                    }
                })
            }
        }
    ).catch(
        error=>{
            res.status(500).json({
                message: "Somthing went Wrong",
                error: error
            });
        }
    );
}

module.exports = {
  signUpEmployer: signUpEmployer,
  signUpConsultant: signUpConsultant,
  login: login,
  getAll: getAll
};
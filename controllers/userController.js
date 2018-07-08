const {User} = require('../models/index.js');

const getAllUsers = (req, res, next) => {
  User.find()
  .then(result => {
    res.status(200).send({result});
  });
};

const getUserByID = (req, res, next) => {
  User.findOne({username: req.params.username})
  .then(user => {
    if (user === null) next({status: 404, message: `user ${req.params.username} does not exist`})
    else res.send({user});
  }).catch(next);
};

module.exports = {getAllUsers, getUserByID}
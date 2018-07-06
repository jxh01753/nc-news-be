const {User} = require('../models/index.js');

const getAllUsers = (req, res, next) => {
  User.find()
  .then(result => {
    res.status(200).send({result})
  })
}

const getUserByID = (req, res, next) => {
  User.findById(req.params.user_id)
  .lean()
  .then(user => {
    res.status(200).send({user});
  }).catch(next);
};

module.exports = {getAllUsers, getUserByID}
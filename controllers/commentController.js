const {Comment} = require('../models/index');

const getAllComments = (req, res, next) => {
  Comment.find()
  .populate({path: 'belongs_to', select: '_id'})
  .populate({path: 'created_by', select: 'username -_id'})
  .lean()
  .then(comments => {
    res.status(200).send({comments});
  }).catch(console.log);
}

module.exports = {getAllComments};

// lean just returns js object? Not mongoose object?



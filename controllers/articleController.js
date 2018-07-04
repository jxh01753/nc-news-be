const {Article} = require('../models/Article');

const getAllArticles = (req, res, next) => {
  Article.find().then(articles => {
    res.status(200).send({articles});
  });
};

module.exports = {getAllArticles};
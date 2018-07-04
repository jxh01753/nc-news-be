const mongoose = require('mongoose');
const {Article, Comment, Topic, User} = require('../models/index');
const {createTopicRef, createUserRef, formatArticleData} = require('../utils');

const seedDB = ({articles, comments, topics, users}) => {
  return mongoose.connection.dropDatabase()
  .then(() => {
  return Promise.all([Topic.insertMany(topics), User.insertMany(users)])
  }).then(([topicDocs, userDocs]) => {
    const topicRef = createTopicRef(topics, topicDocs)
    const userRef = createUserRef(users, userDocs);
    articles = formatArticleData(articles, topicRef, userRef)
    // console.log(userRef);

  }).catch(console.log);
}

module.exports = seedDB;
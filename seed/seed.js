const mongoose = require("mongoose");
const { Article, Comment, Topic, User } = require("../models/index");
const {
  createTopicRef,
  createUserRef,
  createArticleRef,
  formatArticleData,
  formatCommentData
} = require("../utils");

const seedDB = ({ articles, comments, topics, users }) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([Topic.insertMany(topics), User.insertMany(users)]);
    })
    .then(([topicDocs, userDocs]) => {
      const topicRef = createTopicRef(topics, topicDocs);
      const userRef = createUserRef(users, userDocs);
      articles = formatArticleData(articles, topicRef, userRef);

      return Promise.all([Article.insertMany(articles), userRef, topicDocs, userDocs]);
    })
    .then(([articleDocs, userRef, topicDocs, userDocs]) => {
      const articleRef = createArticleRef(articles, articleDocs);
      comments = formatCommentData(comments, articleRef, userRef);
      return Promise.all([Comment.insertMany(comments), articleDocs, topicDocs, userDocs]);
    })
    .catch(console.log);
};

module.exports = seedDB;

const createTopicRef = (collection, docs) => {
  return collection.reduce((ref, item, i) => {
    ref[item.slug] = docs[i]._id
    return ref;
  }, {});
};

const createUserRef = (collection, docs) => {
  return collection.reduce((ref, item, i) => {
    ref[item.username] = docs[i]._id
    return ref;
  }, {});
};

const formatArticleData = (articles, topicRef, userRef) => {
  articles.map((article) => {
    article.created_by = userRef[article.created_by]
    article.belongs_to = topicRef[article.topic]
    // return article // Think this line is redundant.
  });
  return articles
}

const createArticleRef = (collection, docs) => {
  return collection.reduce((ref, item, i) => {
    ref[item.title] = docs[i]._id
    return ref;
  }, {});
};

const formatCommentData = (comments, articleRef, userRef) => {
  comments.map((comments) => {
    comments.created_by = userRef[comments.created_by]
    comments.belongs_to = articleRef[comments.belongs_to]
  });
  return comments;
}

module.exports = {
  createTopicRef,
  createUserRef,
  formatArticleData,
  createArticleRef,
  formatCommentData
};
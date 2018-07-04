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
    return article
  });
  return {...articles}
}

module.exports = {
  createTopicRef,
  createUserRef,
  formatArticleData
};
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
  return articles.map((article) => {
    console.log('>>>>>>>>>>>> THIS IS THE ARTICLE <<<<<<<<<<<<<')
    // console.log(article)
    const newArticle = {...article};
    newArticle.created_by = userRef[article.created_by]
    newArticle.belongs_to = topicRef[article.topic]
    console.log(newArticle.belongs_to)
    return newArticle;
  });
}

const createArticleRef = (collection, docs) => {
  return collection.reduce((ref, item, i) => {
    ref[item.title] = docs[i]._id
    return ref;
  }, {});
};

const formatCommentData = (comments, articleRef, userRef) => {
  return comments.map((comments) => {
    const newComment = Object.assign({}, comments) // This might cause an issue later?
    newComment.created_by = userRef[comments.created_by]
    newComment.belongs_to = articleRef[comments.belongs_to]
    return newComment;
  });
}

module.exports = {
  createTopicRef,
  createUserRef,
  formatArticleData,
  createArticleRef,
  formatCommentData
};
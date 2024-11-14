const BadRequestError = require("../errors/BadRequestError");
const Article = require("../models/newsArticle");

const saveArticle = (req, res, next) => {
  const owner = req.user._id;

  const { url, urlToImage, title, description, source, publishedAt, keyword } =
    req.body;

  Article.create({
    owner,
    url,
    urlToImage,
    title,
    description,
    source,
    publishedAt,
    keyword,
  })
    .then((article) => {
      res.send({ data: article });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provide"));
      }
      return next(err);
    });
};

const getArticles = (req, res, next) => {
  const owner = req.user._id;

  Article.find({ owner })
    .then((articles) => res.statu(200).send({ data: articles }))
    .catch((err) => {
      return next(err);
    });
};
module.exports = { saveArticle, getArticles };

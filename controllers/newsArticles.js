const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
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

//Todo deleteArticle
const deleteArticles = (req, res, next) => {
  const { articleId } = req.params;
  const owner = req.user._id;

  Article.findById(articleId)
    .orFail()
    .then((article) => {
      if (article.owner.toString() !== owner) {
        return next(
          new ForbiddenError(
            "You do not have permission to delete this article"
          )
        );
      }
      return Article.findByIdAndDelete(articleId)
        .then(() =>
          res.status(200).send({ message: "Item deleted successfully" })
        )
        .catch(next);
    });
};

const getArticles = (req, res, next) => {
  const owner = req.user._id;

  Article.find({ owner })
    .then((articles) => res.status(200).send({ data: articles }))
    .catch((err) => {
      return next(err);
    });
};
module.exports = { saveArticle, getArticles, deleteArticles };

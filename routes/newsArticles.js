const router = require("express").Router();
const {
  saveArticle,
  getArticles,
  deleteArticles,
} = require("../controllers/NewsArticles");
const auth = require("../middlewares/auth");
const {
  validateArticleBody,
  validateId,
} = require("../middlewares/validation");

router.get("/", auth, getArticles);

router.post("/", auth, validateArticleBody, saveArticle);

// Delete article
router.delete("/:articleId", auth, validateId, deleteArticles);

module.exports = router;

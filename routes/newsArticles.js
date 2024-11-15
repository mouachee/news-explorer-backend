const router = require("express").Router();
const {
  saveArticle,
  getArticles,
  deleteArticles,
} = require("../controllers/NewsArticles");
const auth = require("../middlewares/auth");

router.get("/", auth, getArticles);

router.post("/", auth, saveArticle);

// Delete article
router.delete("/:articleId", auth, deleteArticles);

module.exports = router;

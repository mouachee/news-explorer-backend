const router = require("express").Router();
const { saveArticle, getArticles } = require("../controllers/NewsArticles");
const auth = require("../middlewares/auth");

router.get("/", getArticles);

router.post("/", saveArticle);
router.post("/articles/articleId", () => console.log("POST articels"));

module.exports = router;

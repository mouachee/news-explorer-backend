const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const articlesRouter = require("./newsArticles");
const userRouter = require("./users");

router.post("/signup", createUser);
router.post("/signin", login);

router.use("/articles", articlesRouter);
router.use("/users", userRouter);

module.exports = router;

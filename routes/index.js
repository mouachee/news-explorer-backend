const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const articlesRouter = require("./newsArticles");
const userRouter = require("./users");
const {
  validateSignUpBody,
  validateLoginBody,
} = require("../middlewares/validation");

router.post("/signup", validateSignUpBody, createUser);
router.post("/signin", validateLoginBody, login);

router.use("/articles", articlesRouter);
router.use("/users", userRouter);

module.exports = router;

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");
const UnauthorizedError = require("../errors/UnauthorizedError");

const { JWT_SECRET } = require("../utils/config");

//Sign up
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email) {
    return next(new BadRequestError("Invalid email"));
  }

  return User.findOne({ email }) //check for existing email
    .then((existingEmail) => {
      if (existingEmail) {
        const error = new Error("Email already exists");
        error.code = 11000;
        throw error;
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({ name, email, password: hash }).then((user) => {
        res.status(202).send({
          name: user.name,
          email: user.email,
        });
      })
    )
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("Email already exists"));
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided for creating user"));
      } else {
        next(err);
      }
    });
};

// Login
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Invalid email or password"));
  }
  // check the email and password against the data base, give 7days token if valid
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        }),
      });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError("Incorrect email or password"));
      } else {
        next(err);
      }
    });
};

// GET current user
const getCurrentUser = (req, res, next) => {
  const owner = req.user._id;

  User.findById(owner)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User not found"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("invalid user data"));
      } else {
        next(err);
      }
    });
};

module.exports = { getCurrentUser, createUser, login };

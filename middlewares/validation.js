const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateArticleBody = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().messages({
      "string.empty": 'The "title" field must be filled in',
    }),
    description: Joi.string().required().messages({
      "string.empty": 'The "description" field must be filled in',
    }),
    url: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "url" field must be filled in',
      "string.uri": 'The "url" field must be a valid url',
    }),
    urlToImage: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "urlToImage" field must be filled in',
      "string.uri": 'The "urlToImage" field must be a valid url',
    }),
    source: Joi.string().required().messages({
      "string.empty": 'The "source" field must be filled in',
    }),
    publishedAt: Joi.string().required().messages({
      "string.empty": 'The "date" must be filled in',
    }),
    keyword: Joi.string().required().messages({
      "string.empty": 'The "keyword" field must be filled in',
    }),
  }),
});
module.exports.validateSignUpBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    email: Joi.string().required().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
      "string.min": 'The minimum length of the "password" field is 8',
    }),
  }),
});
module.exports.validateLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
      "string.min": 'The minimum length of the "password" field is 8',
    }),
  }),
});
module.exports.validateId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().length(24).hex().messages({
      "string.length": "ID must be 24 characters long",
      "string.hex": "ID must be a valid hexadecimal string",
    }),
  }),
});

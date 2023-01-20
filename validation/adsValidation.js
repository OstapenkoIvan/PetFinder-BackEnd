const Joi = require('joi');
const regExp = require('../helpers/regExp');

const addAdValidationSchema = Joi.object({
  name: Joi.string()
    .pattern(regExp.nameRegExp)
    .min(2)
    .max(16)
    .required(),
  family: Joi.string()
    .pattern(regExp.stringRegExp)
    .allow('')
    .optional(),
  birthDate: Joi.date()
    .required(),
  breed: Joi.string()
    .pattern(regExp.stringRegExp)
    .min(2)
    .max(24)
    .required(),
  sex: Joi.string()
    .required(),
  passport: Joi.string()
    .allow('')
    .optional(),
  price: Joi.string()
    .pattern(regExp.priceRegExp)
    .min(1)
    .optional(),
  category: Joi.string()
    .required(),
  addTitle: Joi.string()
    .pattern(regExp.lettersAndDigitsRegExp)
    .min(2)
    .max(48)
    .required(),
  photo: Joi.string()
    .allow('')
    .optional(),
  location: Joi.string()
    .pattern(regExp.stringRegExp)
    .required(),
  comments: Joi.string()
    .pattern(regExp.lettersAndDigitsRegExp)
    .min(8)
    .max(120)
    .allow('')
    .optional(),
});

const updateAdValidationSchema = Joi.object({
  name: Joi.string()
    .pattern(regExp.nameRegExp)
    .min(2)
    .max(16)
    .optional(),
  family: Joi.string()
    .pattern(regExp.stringRegExp)
    .optional(),
  birthDate: Joi.date()
    .optional(),
  breed: Joi.string()
    .pattern(regExp.stringRegExp)
    .min(2)
    .max(24)
    .optional(),
  sex: Joi.string()
    .optional(),
  passport: Joi.string()
    .allow('')
    .optional(),
  price: Joi.string()
    .pattern(regExp.priceRegExp)
    .min(1)
    .optional(),
  category: Joi.string()
    .optional(),
  addTitle: Joi.string()
    .pattern(regExp.lettersAndDigitsRegExp)
    .min(2)
    .max(48)
    .optional(),
  photo: Joi.string()
    .allow('')
    .optional(),
  location: Joi.string()
    .pattern(regExp.stringRegExp)
    .optional(),
  comments: Joi.string()
    .pattern(regExp.lettersAndDigitsRegExp)
    .min(8)
    .max(120)
    .allow('')
    .optional(),
});

module.exports = {
  addAdValidationSchema,
  updateAdValidationSchema,
};

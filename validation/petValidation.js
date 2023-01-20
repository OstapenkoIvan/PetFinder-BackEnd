const Joi = require('joi');
const regExp = require('../helpers/regExp');

const addMyPetValidationSchema = Joi.object({
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
    .optional(),
  photo: Joi.string()
    .allow('')
    .optional(),
  passport: Joi.string()
    .allow('')
    .optional(),
  comments: Joi.string()
    .pattern(regExp.lettersAndDigitsRegExp)
    .min(8)
    .max(120)
    .allow('')
    .optional(),
});

const updateMyPetValidationSchema = Joi.object({
  name: Joi.string()
    .pattern(regExp.nameRegExp)
    .min(2)
    .max(16)
    .optional(),
  family: Joi.string()
    .pattern(regExp.stringRegExp)
    .allow('')
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
  photo: Joi.string()
    .allow('')
    .optional(),
  passport: Joi.string()
    .allow('')
    .optional(),
  comments: Joi.string()
    .pattern(regExp.lettersAndDigitsRegExp)
    .min(8)
    .max(120)
    .allow('')
    .optional(),
});

module.exports = {
  addMyPetValidationSchema,
  updateMyPetValidationSchema,
};

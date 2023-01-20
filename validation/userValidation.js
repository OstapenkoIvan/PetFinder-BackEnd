const Joi = require('joi');
const regExp = require('../helpers/regExp');

const registerUserValidationSchema = Joi.object({
  name: Joi.string().pattern(regExp.nameRegExp).min(1).max(40).required(),
  email: Joi.string()
    .email()
    .pattern(regExp.emailRegExp)
    .min(7)
    .max(63)
    .required(),
  password: Joi.string()
    .pattern(regExp.passwordRegExp)
    .min(7)
    .max(32)
    .required(),
  photo: Joi.string().allow('').optional(),
  birthday: Joi.date().allow('').optional(),
  phone: Joi.string()
    .pattern(regExp.phoneNumberRegExp)
    .min(13)
    .max(13)
    .required(),
  city: Joi.string().required(),
});

const loginUserValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(regExp.emailRegExp)
    .min(7)
    .max(63)
    .required(),
  password: Joi.string()
    .pattern(regExp.passwordRegExp)
    .min(7)
    .max(32)
    .required(),
});

const editUserProfileValidationSchema = Joi.object({
  name: Joi.string().pattern(regExp.nameRegExp).min(1).max(40).optional(),
  email: Joi.string()
    .email()
    .pattern(regExp.emailRegExp)
    .min(7)
    .max(63)
    .optional(),
  photo: Joi.string().allow('').optional(),
  birthday: Joi.date().allow('').optional(),
  phone: Joi.string()
    .pattern(regExp.phoneNumberRegExp)
    .min(13)
    .max(13)
    .allow('')
    .optional(),
  city: Joi.string().optional(),
});

const forgotUserPasswordValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(regExp.emailRegExp)
    .min(7)
    .max(63)
    .required(),
});

const changePasswordValidationSchema = Joi.object({
  password: Joi.string()
    .pattern(regExp.passwordRegExp)
    .min(7)
    .max(32)
    .required(),
  newPassword: Joi.string()
    .pattern(regExp.passwordRegExp)
    .min(7)
    .max(32)
    .required(),
});

module.exports = {
  registerUserValidationSchema,
  loginUserValidationSchema,
  editUserProfileValidationSchema,
  forgotUserPasswordValidationSchema,
  changePasswordValidationSchema,
};

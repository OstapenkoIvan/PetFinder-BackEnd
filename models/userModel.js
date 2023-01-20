const { Schema, model } = require('mongoose');
const regExp = require('../helpers/regExp');

const userSchema = new Schema(
  {
    name: {
      type: String,
      match: regExp.nameRegExp,
      minLength: 1,
      maxLength: 40,
      required: [true, 'Enter your name'],
    },
    email: {
      type: String,
      match: regExp.emailRegExp,
      minLength: 7,
      maxLength: 63,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      match: regExp.passwordRegExp,
      required: [true, 'Set password for user'],
    },
    avatar: {
      type: String,
      default: '',
    },
    birthday: {
      type: Date,
      default: '',
    },
    phone: {
      type: String,
      match: regExp.phoneNumberRegExp,
      minLength: 13,
      maxLength: 13,
      required: [true, 'Enter your phone number'],
    },
    city: {
      type: String,
      required: [true, 'Enter the city in which you live'],
    },
    accessToken: {
      type: String,
      default: '',
    },
    refreshToken: {
      type: String,
      default: '',
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = model('user', userSchema);

module.exports = User;

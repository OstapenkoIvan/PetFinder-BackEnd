const { Schema, model } = require('mongoose');
const regExp = require('../helpers/regExp');

const petSchema = new Schema(
  {
    name: {
      type: String,
      match: regExp.nameRegExp,
      minLength: 2,
      maxLength: 16,
      required: [true, 'Set name for pet'],
    },
    family: {
      type: String,
      match: regExp.stringRegExp,
      default: '',
    },
    birthDate: {
      type: Date,
      required: [true, 'Set birthdate for pet'],
    },
    breed: {
      type: String,
      match: regExp.stringRegExp,
      minLength: 2,
      maxLength: 24,
      required: [true, 'Set breed for pet'],
    },
    sex: {
      type: String,
      enum: ['male', 'female'],
      default: 'male',
    },
    photo: {
      type: String,
      default: '',
    },
    passport: {
      type: String,
      default: '',
    },
    comments: {
      type: String,
      match: regExp.lettersAndDigitsRegExp,
      minLength: 8,
      maxLength: 120,
      default: '',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Pet = model('pet', petSchema);

module.exports = Pet;

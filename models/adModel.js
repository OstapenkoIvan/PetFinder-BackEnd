const { Schema, model } = require('mongoose');
const regExp = require('../helpers/regExp');

const adSchema = new Schema(
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
    category: {
      type: String,
      enum: ['sale', 'inGoodHands', 'lostFound'],
      default: 'inGoodHands',
      required: [true, 'Set category of ad'],
    },
    breed: {
      type: String,
      match: regExp.stringRegExp,
      minLength: 2,
      maxLength: 24,
      required: [true, 'Set breed for ad'],
    },
    birthDate: {
      type: Date,
      required: [true, 'Set birthDate for pet'],
    },
    passport: {
      type: String,
      default: '',
    },
    addTitle: {
      type: String,
      minLength: 2,
      maxLength: 48,
      match: regExp.lettersAndDigitsRegExp,
      required: [true, 'Set title of ad'],
    },
    photo: {
      type: String,
      default: '',
    },
    sex: {
      type: String,
      enum: ['male', 'female'],
      default: 'male',
      required: [true, 'Set sex of pet'],
    },
    comments: {
      type: String,
      match: regExp.lettersAndDigitsRegExp,
      minLength: 8,
      maxLength: 120,
      default: '',
    },
    location: {
      type: String,
      match: regExp.stringRegExp,
      required: [true, 'Set location of ad'],
    },
    price: {
      type: String,
      match: regExp.priceRegExp,
      minLength: 1,
      // default: '$',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        unique: true,
        ref: 'user',
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const Ad = model('ads', adSchema);

module.exports = Ad;

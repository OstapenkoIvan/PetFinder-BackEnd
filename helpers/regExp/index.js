const emailRegExp = require('./emailRegExp');
const lettersAndDigitsRegExp = require('./lettersAndDigitsRegExp');
const nameRegExp = require('./nameRegExp');
const stringRegExp = require('./stringRegExp');
const passwordRegExp = require('./passwordRegExp');
const priceRegExp = require('./priceRegExp');
const phoneNumberRegExp = require('./phoneNumberRegExp');

const regExp = {
  emailRegExp,
  lettersAndDigitsRegExp,
  nameRegExp,
  stringRegExp,
  passwordRegExp,
  priceRegExp,
  phoneNumberRegExp,
};

module.exports = regExp;

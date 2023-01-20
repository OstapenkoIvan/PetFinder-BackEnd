const { Schema, model } = require('mongoose');
const regExp = require('../helpers/regExp');

const oursFriendsSchema = new Schema(
  {
    name: {
      type: String,
    },
    logo: {
      type: String,
      unique: true,
    },
    workTime: [
      {
        type: Object,
      },
    ],
    address: {
      type: String,
    },
    url: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: regExp.phoneNumberRegExp,
      minLength: 13,
      maxLength: 13,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const OursFriends = model('ours_friends', oursFriendsSchema);

module.exports = OursFriends;

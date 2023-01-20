const { isValidObjectId } = require('mongoose');
const jwt = require('jsonwebtoken');
const { createError } = require('../helpers/createError');
const User = require('../models/userModel');
require('dotenv').config();

const { JWT_ACCESS_SECRET_KEY } = process.env;

const userAuthenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw createError({ status: 401, message: 'Not authorized' });
    }

    const { id } = jwt.verify(token, JWT_ACCESS_SECRET_KEY);

    if (!isValidObjectId(id)) {
      throw createError({ status: 422, message: 'Not authorized' });
    }

    const user = await User.findById(id).select({
      password: 0,
      createdAt: 0,
      updatedAt: 0,
      refreshToken: 0,
    });

    if (!user || !user.accessToken || user.accessToken !== token) {
      throw createError({ status: 401, message: 'Not authorized' });
    }

    req.user = user;

    next();
  } catch (error) {
    error.status = 401;
    error.message = 'Not authorized';

    next(error);
  }
};

module.exports = {
  userAuthenticate,
};

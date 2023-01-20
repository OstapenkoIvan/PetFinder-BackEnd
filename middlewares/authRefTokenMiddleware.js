const jwt = require('jsonwebtoken');
const { createError } = require('../helpers/createError');
const User = require('../models/userModel');
require('dotenv').config();

const { JWT_REFRESH_SECRET_KEY } = process.env;

const authRefTokenMiddleware = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw createError({ status: 401, message: 'Not authorized' });
    }

    const { id } = jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY);

    const user = await User.findById(id).select({
      password: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
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
  authRefTokenMiddleware,
};

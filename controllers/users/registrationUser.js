const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createError } = require("../../helpers/createError");
const { randomUUID } = require("crypto");
const User = require("../../models/userModel");

const { JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY } = process.env;

const registerUser = async (req, res) => {
  const { name, email, password, phone, city } = req.body;

  const normalizedEmail = email.toLowerCase();

  const findUser = await User.findOne({ email: normalizedEmail });

  if (findUser) {
    throw createError({ status: 409, message: "Email in use" });
  }

  const bcryptHashPassword = await bcrypt.hash(password, 10);

  const verificationToken = randomUUID();

  const user = await User.create({
    name,
    email: normalizedEmail,
    password: bcryptHashPassword,
    phone,
    city,
    verificationToken,
    verify: true,
  });

  const userId = {
    id: user._id,
  };

  const accessToken = jwt.sign(userId, JWT_ACCESS_SECRET_KEY, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(userId, JWT_REFRESH_SECRET_KEY, {
    expiresIn: "1d",
  });

  const data = await User.findByIdAndUpdate(
    user._id,
    { accessToken, refreshToken },
    { new: true }
  ).select({ password: 0, createdAt: 0, updatedAt: 0, refreshToken: 0 });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  res.status(201).json({
    message: `User ${data.name} registered`,
    user: {
      userId: data._id,
      name: data.name,
      email: data.email,
      photo: data.photo,
      phone: data.phone,
      city: data.city,
      accessToken,
    },
    accessToken,
  });
};

module.exports = registerUser;

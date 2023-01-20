const bcrypt = require('bcryptjs');
const { createError } = require('../../helpers/createError');
const User = require('../../models/userModel');

const changePassword = async (req, res) => {
  const { password, newPassword } = req.body;

  const id = req.user.id;

  const foundUser = await User.findById(id);

  const passwordCompare = await bcrypt.compare(password, foundUser.password);

  if (!passwordCompare) {
    throw createError({
      status: 401,
      message: 'Password is wrong',
    });
  }

  const bcryptHashPassword = await bcrypt.hash(newPassword, 10);

  const data = await User.findByIdAndUpdate(
    id,
    { password: bcryptHashPassword },
    { new: true }
  ).select({ password: 0, createdAt: 0, updatedAt: 0, refreshToken: 0 });

  res.status(200).json(data);
};

module.exports = changePassword;

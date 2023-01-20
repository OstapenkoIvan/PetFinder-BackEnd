const User = require('../../models/userModel');

const logoutUser = async (req, res) => {
  const { _id } = req.user;

  res.clearCookie('refreshToken');

  await User.updateOne({ _id }, { accessToken: '', refreshToken: '' });

  res.status(204).json({ message: 'No Content' });
};

module.exports = logoutUser;

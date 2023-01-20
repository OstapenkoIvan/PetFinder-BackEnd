const registrationUser = require('./registrationUser');
const loginUser = require('./loginUser');
const getCurrentUser = require('./currentUser');
const editUserProfile = require('./editUserProfile');
const updateUserAvatar = require('./updateUserAvatar');
const forgotUserPassword = require('./forgotUserPassword');
const logoutUser = require('./logoutUser');
const refreshToken = require('./refreshToken');
const changePassword = require('./changePassword');

module.exports = {
  registrationUser,
  loginUser,
  getCurrentUser,
  editUserProfile,
  updateUserAvatar,
  forgotUserPassword,
  logoutUser,
  refreshToken,
  changePassword,
};

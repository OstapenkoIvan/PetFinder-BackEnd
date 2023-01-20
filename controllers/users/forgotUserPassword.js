const bcrypt = require('bcryptjs');
const { createError } = require('../../helpers/createError');
const User = require('../../models/userModel');
const { randomUUID } = require('crypto');
const sendSgEmail = require('../../helpers/sendSgEmail');

const forgotUserPassword = async (req, res) => {
  const { email } = req.body;
  
  const random = randomUUID();
  const password = random.slice(0, 8);

  const user = await User.findOne({ email });

  if (!user) {
    throw createError({
      status: 409,
      message: `No user with e-mail ${email} found`,
    });
  }

  const bcryptHashPassword = await bcrypt.hash(password, 10);

  const message = {
    to: email,
    subject: 'Forgot password',
    text: `<Here is your temporary password:${password}`,
    html: `<p>Here is your temporary password: <b>${password}</b></p>`,
  };

  await sendSgEmail(message);

  await User.findByIdAndUpdate(user._id, { password: bcryptHashPassword });

  res
    .status(200)
    .json({ message: `Created new password for user ${user.name}` });
};

module.exports = forgotUserPassword;

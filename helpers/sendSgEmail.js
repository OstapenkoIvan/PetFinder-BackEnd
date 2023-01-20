require('dotenv').config();
const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY, META_MAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

async function sendSgEmail(data) {
  const message = {
    ...data,
    from: META_MAIL,
  };

  await sgMail.send(message);
}

module.exports = sendSgEmail;

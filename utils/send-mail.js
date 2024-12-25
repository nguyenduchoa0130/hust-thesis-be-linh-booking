const nodemailer = require('nodemailer');

module.exports = async function (to, subject, htmlTemplate) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.HOST_EMAIL,
      pass: process.env.HOST_EMAIL_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    html: htmlTemplate,
  });
  return info;
};

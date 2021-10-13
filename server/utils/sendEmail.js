const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 2525,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const sendEmail = catchAsync(async (email, subject, text) => {
  await transporter.sendMail({
    from: process.env.USER,
    to: email,
    subject: subject,
    text: text,
  });
});

module.exports = sendEmail;

const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'andhariamonil@gmail.com',
          pass: 'nempcpnxqicmoznm',
        },
      });

      let mail = await transporter.sendMail({
        from: 'andhariamonil@gmail.com',
        to,
        subject,
        text,
      });

      resolve(mail.messageId);
    } catch (err) {
      console.log('Error', err);
      reject(err);
    }
  });
};

module.exports = sendEmail;

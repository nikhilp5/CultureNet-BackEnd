require('dotenv').config();
var jwt = require('jsonwebtoken');

const generateJWT = async (expiresIn, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await jwt.sign({ user }, 'CultureNet@123', {
        expiresIn,
      });
      resolve(token);
    } catch (err) {
      reject(err);
    }
  });
};

const verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, 'CultureNet@123', (err, data) => {
        if (err) {
          resolve({ verify: false, data: null });
        } else {
          resolve({ verify: true, data });
        }
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

module.exports = {
  generateJWT,
  verifyJWT,
};

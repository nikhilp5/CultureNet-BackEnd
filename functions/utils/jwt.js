require('dotenv').config();
var jwt = require('jsonwebtoken');

const generateJWT = async (expiresIn, email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
        expiresIn,
      });
      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};

const verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          resolve({ verify: false, data: null });
        } else {
          resolve({ verify: true, data: decoded.email });
        }
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  generateJWT,
  verifyJWT,
};

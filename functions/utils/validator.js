const getError = require('./getError');

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const firstNameRegex = /^[A-Za-zÀ-ÿ '-]+$/g;

const validator = (reqBody) => {
  if (reqBody.email && !reqBody.email.match(emailRegex)) {
    throw getError(400, 'Invalid or missing body paramaters');
  }
  if (reqBody.firstName && !reqBody.firstName.match(firstNameRegex)) {
    throw getError(400, 'Invalid or missing body paramaters');
  }
};

module.exports = validator;

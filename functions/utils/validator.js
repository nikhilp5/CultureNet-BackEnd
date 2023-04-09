const getError = require('./getError');

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const firstNameRegex = /^[A-Za-zÀ-ÿ '-]+$/g;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

const validator = (reqBody) => {
  if (reqBody.email && !reqBody.email.match(emailRegex)) {
    throw getError(400, 'Invalid or missing body paramaters');
  }
  if (reqBody.password && !reqBody.password.match(passwordRegex)) {
    throw getError(400, 'Invalid or missing body paramaters');
  }
  if (
    reqBody.confirmPassword &&
    !reqBody.confirmPassword.match(passwordRegex)
  ) {
    throw getError(400, 'Invalid or missing body paramaters');
  }
  if (reqBody.firstName && !reqBody.firstName.match(firstNameRegex)) {
    throw getError(400, 'Invalid or missing body paramaters');
  }
  if (reqBody.lastName && !reqBody.lastName.match(firstNameRegex)) {
    throw getError(400, 'Invalid or missing body paramaters');
  }
};

module.exports = validator;

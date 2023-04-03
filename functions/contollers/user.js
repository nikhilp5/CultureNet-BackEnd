const validator = require('../utils/validator');
const getError = require('../utils/getError');
const User = require('../models/users.model');

const fetchUserById = async (req, res, next) => {
  try {
    const targetRecord = await User.findById(req.params.id);
    if (targetRecord) {
      const { firstName, email } = targetRecord;
      res.json({
        success: true,
        user: { firstName, email },
      });
    } else {
      throw getError(404, 'No such user found');
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const addUser = async (req, res, next) => {
  try {
    if (req.body && req.body.email && req.body.firstName) {
      validator(req.body);
      const { email, firstName } = req.body;
      const targetRecord = await User.findOne({ email });
      if (targetRecord) {
        throw getError(409, 'Email already exists');
      }
      const user = new User({
        firstName,
        email,
      });

      user
        .save()
        .then((doc) => {
          console.log(doc);
          res.status(201);
          res.json({ message: 'User added', success: true });
        })
        .catch((err) => {
          next(err);
        });
    } else {
      throw getError(400, 'Invalid or missing body paramaters');
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  fetchUserById,
  addUser,
};

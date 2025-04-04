const User = require('../models/userModel');

//signup

const signUpPage = (req, res) => {
  res.render('signupLogin');
};

const signup = (req, res) => {
  console.log(req.body);
};

module.exports = {
  signup,
  signUpPage,
};
//lodin

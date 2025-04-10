const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//signup

const signUpPage = (req, res) => {
  res.render('signupLogin', { signUpMessage: '', loginMessage: '' });
};

const signup = (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.render('signupLogin', {
      signUpMessage: "Passwords don't match",
      loginMessage: '',
    });
  }

  //bcrypt/hash the password
  const hashedPass = bcrypt.hashSync(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPass,
  });

  newUser
    .save()
    .then(() =>
      res.render('signupLogin', {
        signUpMessage: 'User registered successfully!',
        loginMessage: '',
      }),
    )
    .catch((err) => {
      console.log(err);
      res.render('signupLogin', {
        signUpMessage: 'Something went wrong. Try again.',
        loginMessage: '',
      });
    });
};

//lodin....Auth.....Jwt

const login = async (req, res) => {
  //first chech if user is exist
  let existUser = await User.findOne({ email: req.body.email });
  console.log(existUser);
  if (existUser) {
    //second chech if password is correct
    let isCorrectPass = bcrypt.compareSync(
      req.body.password,
      existUser.password,
    );
    if (isCorrectPass) {
      // user can see home page
      //Auth, jwt
      let userToken = jwt.sign({ user: existUser }, 'User is JWT now');
      res.cookie('userToken', userToken);
      res.redirect('/');
    } else {
      res.render('signupLogin', {
        signUpMessage: '',
        loginMessage: 'Password is not correct...',
      });
    }
  } else {
    res.render('signupLogin', {
      signUpMessage: '',
      loginMessage: 'User does not exist, please sign up first',
    });
  }

  console.log(req.body);
};

const logout = (req, res) => {
  res.clearCookie('userToken');
  res.redirect('/');
};

module.exports = {
  signup,
  signUpPage,
  login,
  logout,
};

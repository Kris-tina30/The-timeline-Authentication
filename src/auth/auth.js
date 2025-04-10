const isLogedIn = (req, res, nex) => {
  if (req.cookies.userToken) {
    nex();
  } else {
    res.redirect('/user/signup-login');
  }
};
const isNotLogedIn = (req, res, next) => {
  if (!req.cookies.userToken) {
    return next();
  }
  res.redirect('/');
};
module.exports = { isLogedIn, isNotLogedIn };

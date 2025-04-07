const isLogedIn = (req, res, nex) => {
  if (req.cookies.userToken) {
    nex();
  } else {
    res.redirect('/user/signup-login');
  }
};
const isNotLogedIn = (req, res, nex) => {
  if (req.cookies.userToken) {
    nex();
  } else {
    res.redirect('/user/signup-login');
  }
};
module.exports = { isLogedIn, isNotLogedIn };

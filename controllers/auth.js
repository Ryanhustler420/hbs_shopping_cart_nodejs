exports.getLogin = (req, res, next) => {
  res.render ('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  // this isLoggedIn will be lose after the call finishesh
  req.isLoggedIn = true;
  res.redirect ('/');
};

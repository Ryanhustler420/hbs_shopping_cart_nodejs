exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get ('Cookie').split (';')[1].trim ().split ('=')[1];
  res.render ('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  // this isLoggedIn will be lose after the call finishesh
  res.setHeader ('Set-Cookie', 'loggedIn=true');
  res.redirect ('/');
};

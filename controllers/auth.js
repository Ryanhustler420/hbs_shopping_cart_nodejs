exports.getLogin = (req, res, next) => {
  const isLoggedIn =
    req.get ('Cookie').split (';')[1].trim ().split ('=')[1] === 'true';
  // user can manupulate cookies data so that we should not store sensitive data
  // into clients browser

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

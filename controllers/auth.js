exports.getLogin = (req, res, next) => {
  // const isLoggedIn =
  // req.get ('Cookie').split (';')[1].trim ().split ('=')[1] === 'true';
  // user can manupulate cookies data so that we should not store sensitive data
  // into clients browser

  console.log (req.session.isLoggedIn);
  res.render ('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  // this isLoggedIn will be lose after the call finishesh
  // res.setHeader ('Set-Cookie', 'loggedIn=true; Max-Age=10; Secure; HttpOnly');
  req.session.isLoggedIn = true;
  res.redirect ('/');
};

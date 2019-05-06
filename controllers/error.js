exports.error404 = (req, res, next) => {
  res.status (404).render ('pageNotFound', {
    pageTitle: 'Page not found',
    path: '/400',
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.error500 = (req, res, next) => {
  res.status (500).render ('500', {
    pageTitle: 'Error 500',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn,
  });
};

const bcrypt = require ('bcryptjs');

const User = require ('../models/user');

exports.getLogin = (req, res, next) => {
  res.render ('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  const {email, password} = req.body;
  User.findOne ({email: email})
    .then (user => {
      if (!user) {
        return res.redirect ('/login');
      }
      bcrypt
        .compare (password, user.password)
        .then (doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save (err => {
              console.log (err);
              res.redirect ('/');
            });
          }
          res.redirect ('/');
        })
        .catch (err => {
          console.log (err);
          res.redirect ('/login');
        });
    })
    .catch (err => console.log (err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy (err => {
    res.redirect ('/');
  });
};

exports.postSignup = (req, res, next) => {
  const {email, password, confirmPassword} = req.body;
  User.findOne ({email: email})
    .then (userDoc => {
      if (userDoc) {
        return res.redirect ('/signup');
      }
      return bcrypt
        .hash (password, 12)
        .then (hashPassword => {
          const user = new User ({
            email: email,
            password: hashPassword,
            cart: {items: []},
          });

          return user.save ();
        })
        .then (result => {
          res.redirect ('/login');
        });
    })
    .catch (err => {
      console.log (err);
    });
};

exports.getSignup = (req, res, next) => {
  res.render ('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false,
  });
};

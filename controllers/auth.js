const bcrypt = require ('bcryptjs');
const nodemailer = require ('nodemailer');
const sendGridTransport = require ('nodemailer-sendgrid-transport');
const crypto = require ('crypto');
const {validationResult} = require ('express-validator/check');

const User = require ('../models/user');

const transporter = nodemailer.createTransport (
  sendGridTransport ({
    auth: {
      api_key: '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',
    },
  })
);

exports.getLogin = (req, res, next) => {
  let message = vError = req.flash ('error');
  const oldValue = {}
  if (message.length) {
    oldValue['email'] = vError[2].email;
    oldValue['password'] = vError[2].password;
    message = message[0];
  } else {
    message = null;
  }

  res.status(422).render ('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message,
    validationErrors: vError,
    oldInput: {
      email:  oldValue.email || '',
      password:  oldValue.password || ''
    }
  });
};

exports.postLogin = (req, res, next) => {
  const {email, password} = req.body;
  User.findOne ({email: email})
    .then (user => {
      if (!user) {
        req.flash ('error', ['Invalid Email','email', {email, password}]);
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
          req.flash ('error', ['Invalid Password.','password', {email, password}]);
          res.redirect ('/login');
        })
        .catch (err => {
          req.flash ('error', ['Invalid Password.','password', {email, password}]);
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
  const errors = validationResult (req);
  if (!errors.isEmpty ()) {
    console.log (errors.array ());
    return res.status (422).render ('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: errors.array ()[0].msg,
      oldInput: {
        email: email, 
        password: password, 
        confirmPassword: confirmPassword
      },
      validationErrors: errors.array()
    });
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
      return transporter.sendMail ({
        to: email,
        from: 'shop@hbsShop.com',
        subject: 'Signup succeded!',
        html: `
          <h1>You successfully signed up! Thanks for creating an account with us.</h1>
        `,
      });
    })
    .catch (err => {
      console.log (err);
    })    
};

exports.getSignup = (req, res, next) => {
  let message = req.flash ('error');
  if (message.length) {
    message = message[0];
  } else {
    message = null;
  }
  res.render ('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message,
    oldInput: {
      email: "", 
      password: "", 
      confirmPassword: ""
    },
    validationErrors: []
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash ('error');
  if (message.length) {
    message = message[0];
  } else {
    message = null;
  }
  res.render ('auth/reset', {
    path: '/reset',
    pageTitle: 'Password Reset',
    errorMessage: message,
  });
};

exports.postReset = (req, res, next) => {
  const {email} = req.body;
  crypto.randomBytes (32, (err, buffer) => {
    if (err) {
      console.log (err);
      return redirect ('/reset');
    }
    const token = buffer.toString ('hex');
    User.findOne ({email: email})
      .then (user => {
        if (!user) {
          req.flash ('error', 'No account with that email found.');
          return res.redirect ('/reset');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now () + 3600000;
        return user.save ();
      })
      .then (result => {
        res.redirect ('/');
        transporter.sendMail (
          {
            to: email,
            from: 'shop@hbsShop.com',
            subject: 'Password reset',
            html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
          `,
          },
          err => {
            // console.log ('done=-----------------------');
          }
        );
      })
      .catch (err => {
        console.log (err);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne ({resetToken: token, resetTokenExpiration: {$gt: Date.now ()}})
    .then (user => {
      let message = req.flash ('error');
      if (message.length) {
        message = message[0];
      } else {
        message = null;
      }
      res.render ('auth/new-password', {
        path: '/new-password',
        pageTitle: 'New Password',
        errorMessage: message,
        userId: user._id.toString (),
        passwordToken: token,
      });
    })
    .catch (err => {
      console.log (err);
    });
};

exports.postNewPassword = (req, res, next) => {
  const {password, userId, passwordToken} = req.body;
  let resetUser;

  User.findOne ({
    resetToken: passwordToken,
    resetTokenExpiration: {$gt: Date.now ()},
    _id: userId,
  })
    .then (user => {
      resetUser = user;
      return bcrypt.hash (password, 12);
    })
    .then (hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save ();
    })
    .then (result => {
      res.redirect ('/login');
    })
    .catch (err => {
      console.log (err);
    });
};

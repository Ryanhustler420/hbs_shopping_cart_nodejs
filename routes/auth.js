const express = require ('express');
const {check, body} = require ('express-validator/check');

const {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
  getReset,
  postReset,
  getNewPassword,
  postNewPassword,
} = require ('../controllers/auth');

const router = express.Router ();

router.get ('/login', getLogin);

router.get ('/signup', getSignup);

router.post ('/login', postLogin);

router.post (
  '/signup',
  [ // this is optional (wrapping into array)
    check ('email')
    .isEmail ()
    .withMessage ('Please enter a valid email')
    .custom ((value, {req}) => {
      if (value === 'test@test.com') {
        throw new Error ('This email address is forbidden');
      }
      return true;
    }),
    body(
      'password', 
      'Please enter a password with only numbers and text and at least 5 characters.'
    )
      .isLength({min: 5})
      .isAlphanumeric()
  ],
  postSignup
);

router.post ('/logout', postLogout);

router.get ('/reset', getReset);

router.post ('/reset', postReset);

router.get ('/reset/:token', getNewPassword);

router.post ('/new-password', postNewPassword);

module.exports = router;

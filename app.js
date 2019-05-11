const path = require ('path');

const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const session = require ('express-session');
const MongoDBStore = require ('connect-mongodb-session') (session);
const csrf = require ('csurf');
const flash = require ('connect-flash');
const multer = require('multer');

const MONGODB_URI =
  'mongodb+srv://GauravGupta:phpmyadmin@cluster0-erk3k.mongodb.net/shop';

const app = express ();
const store = new MongoDBStore ({
  uri: MONGODB_URI,
  collection: 'sessions',
  // expires: ''
});

const csrfProtection = csrf ();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  }
})

const {error404, error500} = require ('./controllers/error');
const User = require ('./models/user');

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    cb(null, true);
  } else {
    cb(null, false);
  }
}

app.set ('view engine', 'ejs');
app.set ('views', 'views'); //where to find the templates

const adminRoutes = require ('./routes/admin');
const shopRoutes = require ('./routes/shop');
const authRoutes = require ('./routes/auth');

app.use (bodyParser.urlencoded ({extended: false}));
app.use (multer({
  storage: fileStorage,
  fileFilter: fileFilter
}).single('image'));
app.use (express.static (path.join (__dirname, 'public')));
app.use (
  session ({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use (csrfProtection);
app.use (flash ());

app.use ((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken ();
  next ();
});

app.use ((req, res, next) => {
  // this will work because it's outside of async code
  // throw new Error('outside Dummy Err');
  if (!req.session.user) {
    return next ();
  }
  User.findById (req.session.user._id)
    .then (user => {
      if(!user) {
        return next();
      }
      req.user = user;
      next ();
    })
    .catch (err =>{
      // this won't do the trick because it throws the error as async
      // throw new Error('inside Async Catch Dummy Err');
      // next(); can do
      // you have to use next for async like 'next(new Error(dummy))'
      next(new Error(err));
    });
});

app.use ('/admin', adminRoutes);
app.use (shopRoutes);
app.use (authRoutes);

app.get('/500', error500);

app.use (error404);

// when you pass anything to 'next(anything)' this special middleware gets call and express
// knows how to handles such kind of response from other routers
app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render(...);
  // res.redirect('/500');
  res.status (500).render ('500', {
    pageTitle: 'Error 500',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn,
  });
})

mongoose
  .connect (MONGODB_URI, {useNewUrlParser: true})
  .then (result => {
    app.listen (3000);
  })
  .catch (err => {
    console.log (err);
  });

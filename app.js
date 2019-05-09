const path = require ('path');

const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const session = require ('express-session');
const MongoDBStore = require ('connect-mongodb-session') (session);
const csrf = require ('csurf');
const flash = require ('connect-flash');

const MONGODB_URI =
  'mongodb+srv://GauravGupta:phpmyadmin@cluster0-erk3k.mongodb.net/shop';

const app = express ();
const store = new MongoDBStore ({
  uri: MONGODB_URI,
  collection: 'sessions',
  // expires: ''
});

const csrfProtection = csrf ();

const {error404, error500} = require ('./controllers/error');
const User = require ('./models/user');

app.set ('view engine', 'ejs');
app.set ('views', 'views'); //where to find the templates

const adminRoutes = require ('./routes/admin');
const shopRoutes = require ('./routes/shop');
const authRoutes = require ('./routes/auth');

app.use (bodyParser.urlencoded ({extended: false}));
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
      throw new Error(err);
      // next(); can do
    });
});

app.use ((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken ();
  next ();
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
  res.redirect('/500');
})

mongoose
  .connect (MONGODB_URI, {useNewUrlParser: true})
  .then (result => {
    app.listen (3000);
  })
  .catch (err => {
    console.log (err);
  });

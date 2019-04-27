const path = require ('path');

const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const session = require ('express-session');
const MongoDBStore = require ('connect-mongodb-session') (session);

const MONGODB_URI =
  'mongodb+srv://GauravGupta:phpmyadmin@cluster0-erk3k.mongodb.net/shop';

const app = express ();
const store = new MongoDBStore ({
  uri: MONGODB_URI,
  collection: 'sessions',
  // expires: ''
});

const {error404} = require ('./controllers/error');
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

app.use ((req, res, next) => {
  User.findById ('5cc32f4f06e75d0538eda38d')
    .then (user => {
      req.user = user;
      next ();
    })
    .catch (err => console.log (err));
});

app.use ('/admin', adminRoutes);
app.use (shopRoutes);
app.use (authRoutes);

app.use (error404);

mongoose
  .connect (MONGODB_URI, {useNewUrlParser: true})
  .then (result => {
    User.findOne ().then (user => {
      if (!user) {
        const user = new User ({
          name: 'GauravGupta',
          email: 'gouravgupta840@gmail.com',
          cart: {
            items: [],
          },
        });
        user.save ();
      }
    });
    app.listen (3000);
  })
  .catch (err => {
    console.log (err);
  });

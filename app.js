const path = require ('path');

const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');

const app = express ();

const {error404} = require ('./controllers/error');
const {User} = require ('./models/user');

app.set ('view engine', 'ejs');
app.set ('views', 'views'); //where to find the templates

const adminRoutes = require ('./routes/admin');
const shopRoutes = require ('./routes/shop');

app.use (bodyParser.urlencoded ({extended: false}));
app.use (express.static (path.join (__dirname, 'public')));

app.use ((req, res, next) => {
  User.findById ('5cc1be260ccf9b2064f43f24')
    .then (user => {
      req.user = new User (user.name, user.email, user.cart, user._id);
      next ();
    })
    .catch (err => console.log (err));
});

app.use ('/admin', adminRoutes);
app.use (shopRoutes);

app.use (error404);

mongoose
  .connect (
    'mongodb+srv://GauravGupta:phpmyadmin@cluster0-erk3k.mongodb.net/shop?retryWrites=true',
    {useNewUrlParser: true}
  )
  .then (result => {
    app.listen (3000);
  })
  .catch (err => {
    console.log (err);
  });

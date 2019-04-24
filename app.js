const path = require ('path');

const express = require ('express');
const bodyParser = require ('body-parser');

const app = express ();

const {error404} = require ('./controllers/error');
const mongoConnect = require ('./util/database');

app.set ('view engine', 'ejs');
app.set ('views', 'views'); //where to find the templates

// const adminRoutes = require ('./routes/admin');
// const shopRoutes = require ('./routes/shop');

app.use (bodyParser.urlencoded ({extended: false}));
app.use (express.static (path.join (__dirname, 'public')));

// app.use ('/admin', adminRoutes);
// app.use (shopRoutes);

app.use (error404);

mongoConnect (client => {
  console.log (client);
  app.listen (3000);
});

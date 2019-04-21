const path = require ('path');

const express = require ('express');
const bodyParser = require ('body-parser');
const Hbs = require ('express-handlebars');

const app = express ();

app.engine ('handlebars', Hbs ());
app.set ('view engine', 'handlebars');
app.set ('views', 'views'); //where to find the templates

const adminData = require ('./routes/admin');
const shopRoutes = require ('./routes/shop');

app.use (bodyParser.urlencoded ({extended: false}));
app.use (express.static (path.join (__dirname, 'public')));

app.use ('/admin', adminData.routes);
app.use (shopRoutes);

app.use ((req, res, next) => {
  res.status (404).render ('pageNotFound', {pageTitle: 'Page not found'});
});

app.listen (3000);

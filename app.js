const express = require ('express');
const bodyParser = require ('body-parser');

const app = express ();

app.use (bodyParser.urlencoded ({extended: false}));

app.get ('/add-product', (req, res, next) => {
  console.log ('In Product middleware');
  res.send (
    `<form action="/product" method="POST"> 
        <input type="text" name="title">
        <button type="submit">Add Product</button>
    </form>`
  );
});

app.post ('/product', (req, res, next) => {
  const {title} = req.body;
  console.log (title);
  res.redirect ('/');
});

app.get ('/', (req, res, next) => {
  res.send ('<h1>Hello From Express!</h1>');
});

app.listen (3000);

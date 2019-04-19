const express = require ('express');

const app = express ();

app.use ((req, res, next) => {
  console.log ('In the middleware');
  next (); // Alows the req to continue to next middleware in the line
});

app.use ((req, res, next) => {
  console.log ('In another middleware');
  // ... send res
  res.send ('<h1>Hello from Express</h1>');
});

app.listen (3000);

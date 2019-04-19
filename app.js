const http = require ('http');

const express = require ('express');

const app = express ();

app.use ((req, res, next) => {
  console.log ('In the middleware');
  next (); // Alows the req to continue to next middleware in the line
});

app.use ((req, res, next) => {
  console.log ('In another middleware');
  // ... send res
});

const server = http.createServer (app);

server.listen (3000);

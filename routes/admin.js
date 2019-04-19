const path = require ('path');

const express = require ('express');

const router = express.Router ();

// /admin/add-product => GET
router.get ('/add-product', (req, res, next) => {
  res.sendFile (path.join (__dirname, '../', 'views', 'add-product.html'));
});

// /admin/add-product => POST
router.post ('/add-product', (req, res, next) => {
  const {title} = req.body;
  console.log (title);
  res.redirect ('/');
});

module.exports = router;

const path = require ('path');

const express = require ('express');

const rootDir = require ('../util/path');

const router = express.Router ();

// tiny database
const products = [];

// /admin/add-product => GET
router.get ('/add-product', (req, res, next) => {
  res.render ('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
});

// /admin/add-product => POST
router.post ('/add-product', (req, res, next) => {
  const {title} = req.body;
  products.push ({title: title});
  res.redirect ('/');
});

exports.routes = router;
exports.products = products;

const Product = require ('../models/product');

exports.getProductsList = (req, res, next) => {
  Product.fetchAll (products => {
    res.render ('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll (products => {
    res.render ('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};

exports.getCartItems = (req, res, next) => {
  // return current user cart items
  res.render ('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart',
  });
};

exports.getCheckout = (req, res, next) => {
  // show checkout page
  res.render ('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};

// exports.editProductWithId = (req, res, next) => {
//   // get id from params
//   console.log (req.params.id);
// };

// exports.getProdDetail = (req, res, next) => {
//   // fetch with id
// };

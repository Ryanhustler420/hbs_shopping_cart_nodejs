const Product = require ('../models/product');
const Cart = require ('../models/cart');

exports.getProductsList = (req, res, next) => {
  Product.fetchAll (products => {
    res.render ('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    });
  });
};

exports.getProductDetail = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById (prodId, product => {
    res.render ('shop/product-detail', {
      product: product,
      pageTitle: product.title,
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

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById (prodId, product => {
    Cart.addProduct (prodId, product.price);
  });
  res.redirect ('/cart');
};

exports.getCheckout = (req, res, next) => {
  // show checkout page
  res.render ('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};

exports.getOrders = (req, res, next) => {
  // show checkout page
  res.render ('shop/orders', {
    pageTitle: 'Your Orders',
    path: '/orders',
  });
};

// exports.editProductWithId = (req, res, next) => {
//   // get id from params
//   console.log (req.params.id);
// };

// exports.getProdDetail = (req, res, next) => {
//   // fetch with id
// };
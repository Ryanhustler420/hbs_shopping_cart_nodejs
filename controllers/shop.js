const Product = require ('../models/product');

exports.getProductsList = (req, res, next) => {
  Product.fetchAll ()
    .then (products => {
      res.render ('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch (err => {
      console.log (err);
    });
};

exports.getProductDetail = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById (prodId)
    .then (product => {
      res.render ('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
      });
    })
    .catch (err => {
      console.log (err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll ()
    .then (products => {
      res.render ('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch (err => {
      console.log (err);
    });
};

exports.getCartItems = (req, res, next) => {
  req.user
    .getCart ()
    .then (products => {
      console.log ('hello');
      res.render ('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: products,
      });
    })
    .catch (err => {
      console.log (err);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById (prodId)
    .then (product => {
      return req.user.addToCart (product);
    })
    .then (result => {
      res.redirect ('/cart');
    });
};

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findById (prodId, product => {
//     Cart.deleteProduct (prodId, product.price);
//     res.redirect ('/cart');
//   });
// };

// exports.getCheckout = (req, res, next) => {
//   // show checkout page
//   res.render ('shop/checkout', {
//     pageTitle: 'Checkout',
//     path: '/checkout',
//   });
// };

// exports.getOrders = (req, res, next) => {
//   // show checkout page
//   res.render ('shop/orders', {
//     pageTitle: 'Your Orders',
//     path: '/orders',
//   });
// };

// exports.editProductWithId = (req, res, next) => {
//   // get id from params
//   console.log (req.params.id);
// };

// exports.getProdDetail = (req, res, next) => {
//   // fetch with id
// };

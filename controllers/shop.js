const Product = require ('../models/product');
const Order = require ('../models/order');

exports.getProductsList = (req, res, next) => {
  Product.find ()
    .then (products => {
      res.render ('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
        isAuthenticated: req.session.isLoggedIn,
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
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch (err => {
      console.log (err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.find ()
    .then (products => {
      res.render ('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/',
      });
    })
    .catch (err => {
      console.log (err);
    });
};

exports.getCartItems = (req, res, next) => {
  req.user
    .populate ('cart.items.productId')
    .execPopulate ()
    .then (user => {
      const products = user.cart.items;
      res.render ('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: products,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch (err => console.log (err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate ('cart.items.productId')
    .execPopulate ()
    .then (user => {
      const products = user.cart.items.map (i => {
        return {
          quantity: i.quantity,
          product: {...i.productId._doc},
        };
      });
      const order = new Order ({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        products: products,
      });

      return order.save ();
    })
    .then (result => {
      return req.user.clearCart ();
    })
    .then (() => {
      res.redirect ('/orders');
    })
    .catch (err => console.log (err));
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

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart (prodId)
    .then (result => {
      res.redirect ('/cart');
    })
    .catch (err => {
      console.log (err);
    });
};

// exports.getCheckout = (req, res, next) => {
//   // show checkout page
//   res.render ('shop/checkout', {
//     pageTitle: 'Checkout',
//     path: '/checkout',
//   });
// };

exports.getOrders = (req, res, next) => {
  Order.find ({'user.userId': req.user._id})
    .then (result => {
      res.render ('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders',
        orders: result,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch (err => {
      console.log (err);
    });
};

// exports.editProductWithId = (req, res, next) => {
//   // get id from params
//   console.log (req.params.id);
// };

// exports.getProdDetail = (req, res, next) => {
//   // fetch with id
// };

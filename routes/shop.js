const express = require ('express');

// const rootDir = require ('../util/path');
// const adminData = require ('./admin');
const {
  getProductsList,
  getIndex,
  getCartItems,
  getCheckout,
  getOrders,
  getProductDetail,
} = require ('../controllers/shop');

const router = express.Router ();

router.get ('/', getIndex);

router.get ('/products', getProductsList);

router.get ('/products/:productId', getProductDetail);

router.get ('/cart', getCartItems);

router.get ('/orders', getOrders);

router.get ('/checkout', getCheckout);

module.exports = router;

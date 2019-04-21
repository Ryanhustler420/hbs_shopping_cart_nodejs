const express = require ('express');

// const rootDir = require ('../util/path');
// const adminData = require ('./admin');
const {
  getProductsList,
  getIndex,
  getCartItems,
  getCheckout,
} = require ('../controllers/shop');

const router = express.Router ();

router.get ('/', getIndex);

router.get ('/products', getProductsList);

router.get ('/cart', getCartItems);

router.get ('/checkout', getCheckout);

module.exports = router;

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
  postCart,
  postCartDeleteProduct,
  postOrder,
} = require ('../controllers/shop');

const router = express.Router ();

router.get ('/', getIndex);

router.get ('/products', getProductsList);

router.get ('/products/:productId', getProductDetail);

router.get ('/cart', getCartItems);

router.post ('/cart', postCart);

router.post ('/cart-delete-item', postCartDeleteProduct);

router.post ('/create-order', postOrder);

// router.get ('/orders', getOrders);

// router.get ('/checkout', getCheckout);

module.exports = router;

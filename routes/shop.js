const express = require ('express');

// const rootDir = require ('../util/path');
// const adminData = require ('./admin');
const isAuth = require ('../middleware/is-auth');
const {
  getProductsList,
  getIndex,
  getCartItems,
  getOrders,
  getProductDetail,
  postCart,
  postCartDeleteProduct,
  postOrder,
  getInvoice,
  getCheckout
} = require ('../controllers/shop');

const router = express.Router ();

router.get ('/', getIndex);

router.get ('/products', getProductsList);

router.get ('/products/:productId', getProductDetail);

router.get ('/cart', isAuth, getCartItems);

router.post ('/cart', isAuth, postCart);

router.post ('/cart-delete-item', isAuth, postCartDeleteProduct);

router.post ('/create-order', isAuth, postOrder);

router.get ('/orders', isAuth, getOrders);

router.get ('/checkout', isAuth, getCheckout);

router.get('/orders/:orderId', isAuth, getInvoice);

module.exports = router;

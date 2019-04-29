const express = require ('express');

const isAuth = require ('../middleware/is-auth');
const {
  getAddProduct,
  postAddProduct,
  getOwnersProductList,
  getEditProduct,
  postEditProduct,
  postdeleteProduct,
} = require ('../controllers/admin');

const router = express.Router ();

// // /admin/add-product => GET
router.get ('/add-product', isAuth, getAddProduct);

// // /admin/admins-product-list => GET
router.get ('/admins-products-list', isAuth, isAuth, getOwnersProductList);

// // /admin/add-product => POST
router.post ('/add-product', isAuth, postAddProduct);

router.get ('/edit-product/:productId', isAuth, getEditProduct);

router.post ('/edit-product', isAuth, postEditProduct);

router.post ('/delete-product', isAuth, postdeleteProduct);

module.exports = router;

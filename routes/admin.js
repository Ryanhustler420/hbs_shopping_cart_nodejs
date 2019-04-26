const path = require ('path');

const express = require ('express');

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
router.get ('/add-product', getAddProduct);

// // /admin/admins-product-list => GET
router.get ('/admins-products-list', getOwnersProductList);

// // /admin/add-product => POST
router.post ('/add-product', postAddProduct);

router.get ('/edit-product/:productId', getEditProduct);

router.post ('/edit-product', postEditProduct);

// router.post ('/delete-product', postdeleteProduct);

module.exports = router;

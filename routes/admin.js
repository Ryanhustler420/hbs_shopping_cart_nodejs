const express = require ('express');
const {check, body} = require ('express-validator/check');

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
router.get ('/admins-products-list', isAuth, getOwnersProductList);

// // /admin/add-product => POST
router.post ('/add-product', isAuth, [
  check('title')
  .trim()
  .isString()
  .isLength({min: 3})
  .withMessage('Please Enter Product Title'),

  body('imageUrl', 'Please Enter Image URL.')
  .isURL(),  

  check('price')
  .isFloat()
  .custom((value, {req}) => {
    if(value <= 0){
      throw new Error('Price Should Be Higher Than 0.');
    }
    return true;
  }).trim(),

  body('description', 'Please Add Some Description Regarding This Product. Should Be Minimum 10 Words.')
  .trim()
  .isLength({min: 5 , max: 400}),
  
] , postAddProduct);

router.get ('/edit-product/:productId', isAuth, getEditProduct);

router.post ('/edit-product', [
  check('title')
  .trim()
  .isString()
  .isLength({min: 3})
  .withMessage('Please Enter Product Title'),

  body('imageUrl', 'Please Enter Image URL.')
  .isURL(),  

  check('price')
  .isFloat()
  .custom((value, {req}) => {
    if(value <= 0){
      throw new Error('Price Should Be Higher Than 0.');
    }
    return true;
  }).trim(),

  body('description', 'Please Add Some Description Regarding This Product. Should Be Minimum 10 Words.')
  .trim()
  .isLength({min: 5 , max: 400}),
  
], isAuth, postEditProduct);

router.post ('/delete-product', isAuth, postdeleteProduct);

module.exports = router;

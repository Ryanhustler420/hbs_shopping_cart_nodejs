const Product = require ('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render ('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    product: null,
  });
};

exports.postAddProduct = (req, res, next) => {
  const {title, imageUrl, price, description} = req.body;
  const product = new Product (title, imageUrl, description, price);
  product
    .save ()
    .then (result => {
      console.log ('Created Product!');
      res.redirect ('/');
    })
    .catch (err => {
      console.log (err);
    });
  // products.push ({title: title});
};

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (editMode !== 'true') {
//     return res.redirect ('/');
//   }
//   const prodId = req.params.productId;
//   Product.findById (prodId, product => {
//     if (!product) {
//       return res.redirect ('/');
//     }
//     res.render ('admin/edit-product', {
//       pageTitle: 'Edit Product',
//       path: '/admin/edit-product',
//       editing: editMode,
//       product: product,
//     });
//   });
// };

// exports.postEditProduct = (req, res, next) => {
//   const {productId, title, price, imageUrl, description} = req.body;
//   const updatedProduct = new Product (
//     productId,
//     title,
//     imageUrl,
//     description,
//     price
//   );
//   updatedProduct.save ();
//   res.redirect ('/admin/admins-products-list');
// };

// exports.postdeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.deleteById (prodId);
//   res.redirect ('/admin/admins-products-list');
// };

// exports.getOwnersProductList = (req, res, next) => {
//   // return all products create by login user
//   Product.fetchAll (products => {
//     res.render ('admin/admins-products-list', {
//       prods: products,
//       pageTitle: 'Admin Products',
//       path: '/admin/admins-products-list',
//     });
//   });
// };

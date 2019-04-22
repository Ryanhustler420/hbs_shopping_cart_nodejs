const Product = require ('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render ('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  const {title, imageUrl, price, description} = req.body;
  const product = new Product (title, imageUrl, description, price);
  product.save ();
  // products.push ({title: title});
  res.redirect ('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!!editMode) {
    return res.redirect ('/');
  }
  res.render ('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: editMode,
  });
};

exports.getOwnersProductList = (req, res, next) => {
  // return all products create by login user
  Product.fetchAll (products => {
    res.render ('admin/admins-products-list', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/admins-products-list',
    });
  });
};

const Product = require ('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render ('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    product: null,
    isAuthenticated: req.isLoggedIn,
  });
};

exports.postAddProduct = (req, res, next) => {
  const {title, imageUrl, price, description} = req.body;
  const product = new Product ({
    title,
    price,
    description,
    imageUrl,
    userId: req.user,
  });
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

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (editMode !== 'true') {
    return res.redirect ('/');
  }
  const prodId = req.params.productId;
  Product.findById (prodId)
    .then (product => {
      if (!product) {
        return res.redirect ('/');
      }
      res.render ('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch (err => {
      console.log (err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const {productId, title, price, imageUrl, description} = req.body;
  Product.findById (productId)
    .then (product => {
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;
      return product.save ();
    })
    .then (result => {
      res.redirect ('/admin/admins-products-list');
    })
    .catch (err => console.log (err));
};

exports.postdeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndDelete (prodId)
    .then (() => {
      res.redirect ('/admin/admins-products-list');
    })
    .catch (err => {
      console.log (err);
    });
};

exports.getOwnersProductList = (req, res, next) => {
  // return all products create by login user
  Product.find ()
    // .select ('title price -_id')
    // .populate ('userId', 'name')
    .then (products => {
      console.log (products);
      res.render ('admin/admins-products-list', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/admins-products-list',
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch (err => {
      console.log (err);
    });
};

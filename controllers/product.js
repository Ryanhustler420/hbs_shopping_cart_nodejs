const Product = require ('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render ('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const {title} = req.body;
  const product = new Product (title);
  product.save ();
  // products.push ({title: title});
  res.redirect ('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll (products => {
    res.render ('shop', {
      prods: products,
      pageTitle: 'shop',
      path: '/',
      hasProduct: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

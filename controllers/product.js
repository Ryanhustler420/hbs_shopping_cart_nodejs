// tiny database
const products = [];

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
  products.push ({title: title});
  res.redirect ('/');
};

exports.getProducts = (req, res, next) => {
  res.render ('shop', {
    prods: products,
    pageTitle: 'shop',
    path: '/',
    hasProduct: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
};

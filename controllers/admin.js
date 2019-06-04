const Product = require ('../models/product');
const {validationResult} = require ('express-validator/check');
const FileHelper = require('../util/file');

exports.getAddProduct = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect ('/login');
  }
  res.render ('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    errorMessage: '',
    product: {
      title: '', 
      imageUrl: '', 
      price: '',
      description: ''
    },
    validationErrors: []
  });
};

exports.postAddProduct = (req, res, next) => {
  const {title, price, description} = req.body;
  const image = req.file;
  const errors = validationResult (req);

  if(!image){
    return res.status(422).render ('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
      errorMessage: "Attached file is not an image",
      product: {
        title: title, 
        price: price,
        description: description
      },
      validationErrors: []
    });
  }

  if(!errors.isEmpty()) {
    return res.status(422).render ('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
      errorMessage: errors.array ()[0].msg,
      product: {
        title: title,
        price: price,
        description: description
      },
      validationErrors: errors.array()
    });
  }

  const imageUrl = image.path;

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
      console.log ("-1",err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
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
        errorMessage: '',
        validationErrors: []
      });
    })
    .catch (err => {
      console.log ("0",err);
      // res.redirect('/500');
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const {productId, title, price, description} = req.body;
  const image = req.file;
  const errors = validationResult (req);

  if(!errors.isEmpty()) {
    return res.status(422).render ('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      errorMessage: errors.array ()[0].msg,
      product: {
        title: title, 
        price: price,
        description: description,
        _id: productId
      },
      validationErrors: errors.array()
    });
  }
  Product.findById (productId)
  .then (product => {
      // throw new Error('Dummy');
      if (product.userId.toString () !== req.user._id.toString ()) {
        return res.redirect ('/');
      }
      product.title = title;
      product.price = price;
      if(image) {
        FileHelper.deleteFile(product.imageUrl);
        product.imageUrl = image.path;
      }
      product.description = description;
      
      product.save ().then (result => {
        res.redirect ('/admin/admins-products-list');
      });
    })
    .catch (err => {
      console.log ("1",err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId).then(product => {
    if(!product){
      return next(new Error('Product not found.'))
    }
    FileHelper.deleteFile(product.imageUrl);
    return Product.deleteOne ({_id: prodId, userId: req.user._id});
  }).then (() => {
    res.status(200).json({
      message: 'Success!'
    })
  })
  .catch (err => {
    // something went wrong!
    res.status(500).json({
      message: 'Deleting Product Failed!'
    })
  });
};

exports.getOwnersProductList = (req, res, next) => {
  // return all products create by login user
  Product.find ({userId: req.user._id})
    // .select ('title price -_id')
    // .populate ('userId', 'name')
    .then (products => {
      res.render ('admin/admins-products-list', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/admins-products-list',
      });
    })
    .catch (err => {
      console.log ("3",err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

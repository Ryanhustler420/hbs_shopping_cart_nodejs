const Product = require ('../models/product');
const {validationResult} = require ('express-validator/check');
const mongoose = require('mongoose');

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
  const {title, imageUrl, price, description} = req.body;
  const errors = validationResult (req);
  if(!errors.isEmpty()) {
    return res.status(422).render ('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
      errorMessage: errors.array ()[0].msg,
      product: {
        title: title, 
        imageUrl: imageUrl, 
        price: price,
        description: description
      },
      validationErrors: errors.array()
    });
  }
  const product = new Product ({
    _id: new mongoose.Types.ObjectId('5cc330facd40d814281c41fb'), //creating product with duplicate id
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
      // console.log ('An error occured!');

      // render 500 server error page
          // res.render ('admin/edit-product', {
          //   pageTitle: 'Add Product',
          //   path: '/admin/add-product',
          //   editing: false,
          //   errorMessage: 'Database operation failed, please try again.',
          //   product: {
          //     title: title, 
          //     imageUrl: imageUrl, 
          //     price: price,
          //     description: description
          //   },
          //   validationErrors: []
          // });
      // res.redirect('/500');
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
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
        errorMessage: '',
        validationErrors: []
      });
    })
    .catch (err => {
      // console.log (err);
      // res.redirect('/500');
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const {productId, title, price, imageUrl, description} = req.body;
  const errors = validationResult (req);
  if(!errors.isEmpty()) {
    return res.status(422).render ('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      errorMessage: errors.array ()[0].msg,
      product: {
        title: title, 
        imageUrl: imageUrl, 
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
      product.imageUrl = imageUrl;
      product.description = description;
      product.save ().then (result => {
        res.redirect ('/admin/admins-products-list');
      });
    })
    .catch (err => {
      // console.log (err)
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postdeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteOne ({_id: prodId, userId: req.user._id})
    .then (() => {
      res.redirect ('/admin/admins-products-list');
    })
    .catch (err => {
      console.log (err);
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
      // console.log (err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

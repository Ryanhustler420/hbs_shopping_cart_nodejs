const fs = require ('fs');
const path = require ('path');
const Cart = require ('./cart');

const getPath = () =>
  path.join (
    path.dirname (process.mainModule.filename),
    'data',
    'products.json'
  );

const getProductsFromFile = cb => {
  fs.readFile (getPath (), (err, fileContent) => {
    if (err) {
      cb ([]);
    } else {
      cb (JSON.parse (fileContent.toString ()));
    }
  });
};

module.exports = class Product {
  constructor (id, title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  save () {
    getProductsFromFile (products => {
      if (this.id) {
        const existingProductIndex = products.findIndex (
          prod => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile (getPath (), JSON.stringify (updatedProducts), err => {
          console.log (getPath (), err);
        });
      } else {
        this.id = Math.random ().toString ();
        products.push (this);
        fs.writeFile (getPath (), JSON.stringify (products), err => {
          console.log (getPath (), err);
        });
      }
    });
  }

  static deleteById (prodId) {
    getProductsFromFile (products => {
      const product = products.find (prod => prod.id === prodId);
      const updatedProducts = products.filter (prod => prod.id !== prodId);
      fs.writeFile (getPath (), JSON.stringify (updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct (prodId, product.price);
        }
        console.log (getPath (), err);
      });
    });
  }

  static fetchAll (cb) {
    getProductsFromFile (cb);
  }

  static findById (id, cb) {
    getProductsFromFile (products => {
      const product = products.find (p => p.id === id);
      cb (product);
    });
  }
};

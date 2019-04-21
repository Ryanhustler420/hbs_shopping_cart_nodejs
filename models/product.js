const fs = require ('fs');
const path = require ('path');

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
  constructor (title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save () {
    getProductsFromFile (products => {
      products.push (this);
      fs.writeFile (getPath (), JSON.stringify (products), err => {
        console.log (getPath (), err);
      });
    });
  }

  static fetchAll (cb) {
    getProductsFromFile (cb);
  }
};

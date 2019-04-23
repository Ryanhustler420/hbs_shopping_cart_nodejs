const fs = require ('fs');
const path = require ('path');

const getPath = () =>
  path.join (path.dirname (process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {
  static addProduct (id, productPrice) {
    // Fetch the previous cart
    fs.readFile (getPath (), (err, fileContent) => {
      let cart = {products: [], totalPrice: 0};
      if (!err) {
        cart = JSON.parse (fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex (
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = {...existingProduct};
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = {id: id, qty: 1};
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;

      fs.writeFile (getPath (), JSON.stringify (cart), err => {
        console.log (err);
      });
    });
  }

  static deleteProduct (id, ProductPrice) {
    fs.readFile (getPath (), (err, fileContent) => {
      if (err) {
        return;
      }
      let updatedCart = {...JSON.parse (fileContent)};
      const product = updatedCart.products.findIndex (prod => prod.id === id);
      const prodyQty = product.qty;
      updatedCart.products = updatedCart.products.filter (
        prod => prod.id !== id
      );
      updatedCart.totalPrice -= ProductPrice * prodyQty;

      fs.writeFile (getPath (), JSON.stringify (updatedCart), err => {
        console.log (err);
      });
    });
  }

  static getCart (cb) {
    fs.readFile (getPath (), (err, fileContent) => {
      const cart = JSON.parse (fileContent);
      if (err) {
        cb (null);
      } else {
        cb (cart);
      }
    });
  }
};

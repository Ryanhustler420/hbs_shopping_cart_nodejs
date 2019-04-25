const {getDb} = require ('../util/database');
const mongodb = require ('mongodb');

class User {
  constructor (username, email, cart, id) {
    this.email = email;
    this.username = username;
    this.cart = cart; // {items: []}
    this._id = id;
  }

  save () {
    const db = getDb ();
    return db.collection ('users').insertOne (this);
  }

  addToCart (product) {
    const cartProductIndex = this.cart.items.findIndex (cp => {
      return cp.productId.toString () === product._id.toString ();
    });
    let newQuantity = 1;
    const updatedCartItem = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItem[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItem.push ({
        productId: new mongodb.ObjectId (product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {items: updatedCartItem};
    const db = getDb ();
    return db
      .collection ('users')
      .updateOne (
        {_id: new mongodb.ObjectId (this._id)},
        {$set: {cart: updatedCart}}
      );
  }

  static findById (userId) {
    const db = getDb ();
    return db
      .collection ('users')
      .findOne ({_id: new mongodb.ObjectId (userId)})
      .then (user => {
        return user;
      })
      .catch (err => {
        console.log (err);
      });
  }
}

exports.User = User;

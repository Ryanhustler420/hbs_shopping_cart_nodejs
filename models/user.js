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
    // const cartProduct = this.cart.items.findIndex (cp => {
    //   return cp._id === product._id;
    // });
    const updatedCart = {items: [{...product, quantity: 1}]};
    const db = getDb ();
    return db
      .collection ('users')
      .updateOne ({_id: new ObjectId (this._id)}, {$set: {cart: updatedCart}});
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

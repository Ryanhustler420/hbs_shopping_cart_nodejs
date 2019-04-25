const {getDb} = require ('../util/database');
const mongodb = require ('mongodb');

class User {
  constructor (username, email) {
    this.email = email;
    this.username = username;
  }

  save () {
    const db = getDb ();
    return db.collection ('users').insertOne (this);
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

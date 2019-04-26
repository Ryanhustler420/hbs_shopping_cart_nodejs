// const {getDb} = require ('../util/database');
// const mongodb = require ('mongodb');

// class Product {
//   constructor (title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId (id) : null;
//     this.userId = userId;
//   }

//   save () {
//     const db = getDb ();
//     let dbOp;
//     if (this._id) {
//       // update the product
//       dbOp = db
//         .collection ('products')
//         .updateOne ({_id: new mongodb.ObjectId (this._id)}, {$set: this});
//     } else {
//       dbOp = db.collection ('products').insertOne (this);
//     }
//     return dbOp.then (result => {}).catch (err => {
//       console.log (err);
//     });
//   }

//   static fetchAll () {
//     const db = getDb ();
//     return db
//       .collection ('products')
//       .find ()
//       .toArray ()
//       .then (products => {
//         // console.log (products);
//         return products;
//       })
//       .catch (err => {
//         console.log (err);
//       });
//   }

//   static findById (id) {
//     const db = getDb ();
//     return db
//       .collection ('products')
//       .find ({_id: new mongodb.ObjectId (id)})
//       .next ()
//       .then (product => {
//         // console.log (product);
//         return product;
//       })
//       .catch (err => {
//         console.log (err);
//       });
//   }

//   static deleteById (id) {
//     const db = getDb ();
//     return db
//       .collection ('products')
//       .deleteOne ({_id: new mongodb.ObjectId (id)})
//       .then (result => {
//         console.log ('deleted');
//       })
//       .catch (err => {
//         console.log (err);
//       });
//   }
// }

// module.exports = Product;

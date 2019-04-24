const mongodb = require ('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
  MongoClient.connect (
    'mongodb+srv://GauravGupta:phpmyadmin@cluster0-erk3k.mongodb.net/test?retryWrites=true',
    {useNewUrlParser: true}
  )
    .then (client => {
      console.log ('Connected!');
      callback (client);
    })
    .catch (err => {
      console.log (err);
    });
};

module.exports = mongoConnect;

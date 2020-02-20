var MongoClient = require('mongodb').MongoClient;
// var mongoServerUrl = require('./config.js').mongoServerUrl;
var mongoServerUrl = 'mongodb://localhost:27017/hut';
var huts = require('./huts.json');

var env = process.env.NODE_ENV || 'dev'
console.log(`${env} mode`);
var collectionName = (env === 'prod') ? 'data' : 'data_dev';

var dropCollection = (db) => {
  return new Promise( (resolve, reject) => {
    db.collection(collectionName).drop( (err, result) => {
      // if (err) throw err;
      console.log('dropCollection');
      resolve();
    })
  })
}

var createCollection = (db) => {
  return new Promise( (resolve, reject) => {
    db.createCollection(collectionName, (err, result) => {
      if (err) throw err;
      console.log('createCollection');
      resolve();
    })
  })
}

var insertDocuments = (db) => {
  return new Promise( (resolve, reject) => {
    db.collection(collectionName).insert(huts, (err, result) => {
      if (err) throw err;
      console.log('insertDocuments');
      resolve();
    })
  })
}

MongoClient.connect(mongoServerUrl, (err, db) => {
  dropCollection(db)
  .then( () => createCollection(db) )
  .then( () => insertDocuments(db) )
  .then( () => {
    console.log('done');
    process.exit();
  })
})

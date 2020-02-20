var env = process.env.NODE_ENV || 'dev'
console.log(`${env} mode`);

var huts = require('./huts.json');

var router = require('./router.js');
var crawler = require('./crawler/crawler.js');

var MongoClient = require('mongodb').MongoClient; // https://github.com/mongodb/node-mongodb-native
var mongoServerUrl = require('./config.js').mongoServerUrl;

var collectionName = (env === 'prod') ? 'data' : 'data_dev';

MongoClient.connect('mongodb://localhost:27017/hut', (err, db) => {
  if (err) console.log(err);

  router.route(db, huts);
  crawler.crawl(db.collection(collectionName), huts);
})

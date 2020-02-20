var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());

exports.route = (db, huts) => {

  app.get('/', (req, res) => {
    res.send('ha')
  });

  app.get('/huts', (req, res) => {
    res.json(huts);
  });

  app.get('/data-dev/', (req, res) => {
    db.collection('data_dev').find({}).toArray( (err, docs) => {
      res.json(docs);
    })
  });

  app.listen(3002, () => {
    console.log('listening on port 3002');
  });
}

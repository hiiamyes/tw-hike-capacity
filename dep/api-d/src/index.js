let express = require('express');
let app = express();

let cors = require('cors');
app.use(cors());

let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let co = require('co');
let MongoClient = require('mongodb').MongoClient;

app.get('/huts', (req, res) => {
  co(function* (){
    let db = yield MongoClient.connect(
      process.env.NODE_ENV === 'production' ?
      'mongodb://yes:yes@hiiamyes.com:27017/tw-huts' :
      'mongodb://yes:yes@hiiamyes.com:27017/tw-huts-dev'
    );
    let huts = yield db.collection('huts').find().toArray();
    db.close();
    res.json(huts);
  })
  .catch(err => {
    console.log('err: ', err);
  })
})

const port = process.env.NODE_ENV === 'production' ? 3008 : 4008;
app.listen(
  port,
  () => console.log(`${process.env.NODE_ENV}: listening on ${port}`)
)

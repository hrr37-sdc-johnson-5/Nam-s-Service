require('newrelic');
var express = require ('express');
var path = require ('path');
var DIST_DIR = path.join(__dirname, '../client/dist');
var db = require ('../db/index');
var bodyParser =require ('body-parser');
var cors = require ('cors');

var app = express();

app.use(cors());

app.use(express.static(DIST_DIR))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())



app.get('/media/:id', (req,res) =>{
  var id = req.params.id;
  //console.time('get Data');
  db.getData(id, (err, data) => {
    //console.timeEnd('get Data');
    if(err) {
      res.sendStatus(404);
    }else{
      res.status(200).json(data);
    }
  });
});

app.post('/media', (req, res) =>{
  console.time('post Data');
  let album = req.body;
  db.createData(album, (err, data) => {
    console.timeEnd(`post data`)
    if(err) {
      res.status(400);
    }else{
      res.status(201).json(data);
    }
  });
});

app.put('/media/:id', (req,res) =>{
  var id = req.params.id;
  let album = req.body;
  console.time('put Data');
  db.updateData(id, album, (err, data) => {
    console.timeEnd('put Data');
    res.json(data);
  })
});

app.delete('/media/:id', (req,res) =>{
  var id = req.params.id;
  console.time('delete Data');
  db.deleteData(id, (err, data) => {
    console.timeEnd('delete Data');
    if(err) {
      res.sendStatus(404);
    }else{
      res.status(200).json(data);
    }
  })
});


app.get('/*', (req, res) => {
  res.sendFile(DIST_DIR + "/index.html")
})

var port = 3002;

app.listen(port, ()=> {
  console.log(`Listening to port ${port}`)
})

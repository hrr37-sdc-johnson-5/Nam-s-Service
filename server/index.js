var express = require ('express');
var path = require ('path');
var DIST_DIR = path.join(__dirname, '../client/dist');
var db = require ('../db/index')
var bodyParser =require ('body-parser');

var app = express();

app.use(express.static(DIST_DIR))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())


app.get('/media/:id', (req,res) =>{
  var id = req.params.id;

  db.getData(id, (data) => {

    res.json(data)
  })
})

var port = 3002;

app.listen(port, ()=> {
  console.log(`Listening to port ${port}`)
})

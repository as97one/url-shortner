var express = require('express')
var url = 'mongodb://localhost:27017/shorturl'
var mongo = require('mongodb').MongoClient
var redirect = require('express-simple-redirect');
var app = express()

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}



app.get('/:path', function (req, res) {
    var path_given = req.params.path
    console.log(path_given)
mongo.connect(url, function(err, db) {
    if (err) throw err
    var col = db.collection('urls')
  col.find({
      _id: path_given
    }).toArray(function(err, documents) {
    if(err) return console.log(err)
    if (documents){
        console.log(documents[0].original_url)
        app.use(redirect({
          '/my-url': documents[0].original_url  // Internal redirect to /about page 
        }));
        // res.writeHead(301,
        //   {Location: documents[0].original_url});
        res.end();
    }
    db.close()
    })
})
    
})

app.get('/shorten/:url*', function (req, res) {
    var url_given = req.params.url+req.params['0']
mongo.connect(url, function(err, db) {
    if (err) throw err
    var col = db.collection('urls')
    var link_id = S4()
  var doc = {
      original_url: url_given,
      _id: link_id
    }
  col.insert(doc, function(err, data) {
    if (err) throw err
    
    var to_return = {
            url_given: url_given,
            url_shorten: "https://fcc-api-projects-as97one.c9users.io/"+link_id
        }
    console.log(data)
    res.send(JSON.stringify(to_return))
    db.close()
  })
})
    
})




app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
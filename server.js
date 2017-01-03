var express = require('express')
var strftime = require('strftime')
var ip = require("ip")
var platform = require("platform")
var app = express()
app.get('/whoami', function (req, res) {
    // var lang = require("get-browser-language")()
    console.log(req.acceptsLanguages)
    var to_return = {
            ip: ip.address(),
            language: req.acceptsLanguages()[0],
            os: platform.os
        }
    
    res.send(JSON.stringify(to_return))
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
var express = require('express');
var app = new express();

app.get('/', function(req, res){
    res.send('hello');
})

app.listen(3000, function(){
    console.log('listening on port 3000')
})
var express = require('express');
var port = 8080;
var responseTime = require('response-time');
var path = require('path');
var img = path.join(__dirname, 'sampleImg.jpg');
var app = new express();
var fs = require('fs');

app.use(responseTime());

app.get('/nonStream', (request, response) => {
   
    var file = fs.readFile(img, (err, data) => {
        response.end(data);
    })
});

app.get('/nonStream_2', (request, response) => {
   
    var file = fs.readFileSync(img);
    response.end(file);
});

app.get('/stream', (request, response) => {
   
    var stream = fs.createReadStream(img);
    stream.pipe(response);
});

app.get('/stream_2', (request, response) => {
   
    var stream = fs.createReadStream(img);
    
    stream.on('data', (data) => {
        response.write(data);
    })
    
    stream.on('end', () => response.end()); 
});

app.listen(port);
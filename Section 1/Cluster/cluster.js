var cluster = require('cluster');
var express = require('express');
var numOfCPUs = require('os').cpus().length;
var clusterDic = {};
var port = 8080;

if (cluster.isMaster){
  
    for (var i = 0 ; i < numOfCPUs; i++){
        cluster.fork();
    };
    
    cluster.on('online', (worker) => {
        console.log("Woker with pid " + worker.process.pid + " is online");
    });
    
    cluster.on('exit', (worker, code, signal) => {
        console.log("Worker with pid " + worker.process.pid + " exited with code " + code); 
    });
}
else if (cluster.isWorker){
        clusterDic[cluster.worker.process.pid] = 0;
    
        console.log("Worker with pid %s is listening to http://localhost:%s", cluster.worker.process.pid, port);
    
        var app = new express();
    
        app.get('/cluster', (request, response) => {
            clusterDic[cluster.worker.process.pid] += 1;
            var mess = "Worker with pid " + cluster.worker.process.pid + " responsed";
            console.log(mess);
            
            response.writeHead(200);
            response.end(mess);
        });
        app.listen(port);
};

process.on('SIGINT', () => {
   console.log(clusterDic);
   process.exit(0);
});
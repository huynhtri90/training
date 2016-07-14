var events = require('events');
var emitter = new events.EventEmitter();

emitter.on('Hello A', function(){
    console.log("Hi A"); 
}); 

emitter.on('Hello B', function(){
    console.log("Hi B");
});

emitter.on('Hello A', () => console.log("Hi all"));

emitter.emit('Hello A');
emitter.emit('Hello B');
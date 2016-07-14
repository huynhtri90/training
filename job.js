var util = require('util');
var events = require('events');

var job = function Job(){
  
    this.process = () => this.emit('done', 
        { 
            completedOn : new Date(),
            information: "Information"
        }
    );  
};

util.inherits(job, events.EventEmitter);
module.exports = job;
var job = require('./job.js');
var Job = new job();

Job.on('done', (info) => {
    console.log(info.information);
    console.log("Completed on: " + info.completedOn);
});

Job.process();
const cluster = require('cluster'),
  http2 = require('http2'),
  config = require('./config');


function delay_connect(i) {
  let client = http2.connect(config.path, config.settings);
  client.on('error', function(err){
    console.log(err)
    process.exit()
  });
  setTimeout(function() {


    let req = client.request({
      ':path': '/',
      ':method': 'post'
    });

    //req.end(JSON.stringify({date: Date.now()}));

  }, 999999999)

}

if (cluster.isMaster) {

  for (let i = 0; i < config.clusters; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    cluster.fork();
  });

} else {

  for (let i = 0; i < config.conn; i++) {
    delay_connect(i)
  }

}

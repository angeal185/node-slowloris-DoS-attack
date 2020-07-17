const http2 = require('http2'),
server  = http2.createServer();

server.on('error', (err) => console.error(err));

server.on('connection', () => console.error('connected'));

server.on('stream', (stream, headers) => {
  stream.on('close', function(err){
    console.log('closed')
  });

  stream.on('error', function(err){
    console.log(err)
  });

  stream.end('<h1>Hello World</h1>');

});


server.listen(8080, function(){
  console.log('server listening at port:8080')
})

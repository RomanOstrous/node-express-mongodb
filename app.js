const http = require('http');

const PORT = 3000;

const server = http.createServer((rec, res) => {
  console.log('Server request');
});

server.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`);
});

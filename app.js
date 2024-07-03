const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log('Server request');
  console.log(req.url, req.method);

  // res.setHeader('Content-Type', 'text/html');
  // res.write('<h1>Test info</h1>');
  // res.end();

  res.setHeader('Content-Type', 'text/json');

  const data = JSON.stringify([
    {name: 'Roma', age: 25},
    {name: 'Kati', age: 12}
  ]);

  res.end(data);
});

server.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`);
});


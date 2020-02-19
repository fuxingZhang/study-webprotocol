const http = require('http');
const fs = require('fs');
const html = fs.readFileSync('./index.html');
const port = 3000;

http.createServer((req, res) => {
  console.log(req.url)

  if (req.url === '/favicon.ico') {
    res.statusCode = 404;
    res.end('not found');
    return
  }

  if (req.method === 'POST') {
    const list = [];

    req.on('data', chunk => {
      console.log('on data')
      console.log(chunk)
      list.push(chunk);
    })

    req.on('end', () => {
      const buf = Buffer.concat(list);
      const split = '\r\n\r\n';

      const png = buf.slice(buf.indexOf(split) + split.length, buf.lastIndexOf('\r\n------WebKitFormBoundary'));
      console.log(Buffer.byteLength(png));

      res.writeHead(200, { 'Content-disposition': 'attachment; filename=1.png' });
      res.end(png);
    })
  } else if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html)
  }
}).listen(port, () => {
  console.log(`listening on port ${port}`)
});
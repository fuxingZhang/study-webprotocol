
const net = require('net');
const fs = require('fs');

module.exports = function (url) {
  return new Promise((resolve, reject) => {
    const _url = new URL(url)
    console.log(_url);
    const host = _url.host;
  
    const client = net.connect(80, host);

    for (const event of ['close', 'drain', 'end', 'error', 'lookup', 'timeout']) {
      client.on(event, function () {
        console.log(event, arguments);
        if(event === 'error') reject(arguments);
      });
    }
  
    client.on('connect', function () {
      console.log('connect', arguments);
  
      client.write(`GET ${_url.pathname} HTTP/1.1\r\n` +
        `Host: ${host}\r\n` +
        'Connection: close\r\n' +
        '\r\n');
    });
  
    const list = []
    client.on('data', chunk => {
      list.push(chunk);
    });
  
    client.on('end', () => {
      const buf = Buffer.concat(list);
      const split = '\r\n\r\n';
      const image = buf.slice(buf.indexOf(split) + split.length);
      fs.writeFileSync('./download.jpg', image);
      resolve('download over')
    });
  })
}

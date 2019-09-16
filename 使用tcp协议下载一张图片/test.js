const download = require('./download');
const url = 'http://jiangsu.sinaimg.cn/2014/0620/U9020P1194DT20140620162042.jpg'

download(url)
.then(console.log)
.catch(console.error);
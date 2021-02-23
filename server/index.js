const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log('request', req.url);
    let file = 'index.html';

    if (req.url ==! '/') {
        file = req.url.replace('/', '');
    }

    fs.readFile(`public/src/${file}`, (err, data) => {
        if (err) {
            console.log('error', err);
            res.end();
            return;
        }
        res.write(data)
        res.end()
    });

    // res.end();
})

server.listen(3000)
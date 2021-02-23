const express = require('express');
const path = require("path");
const app = express();
const port = 3000;

// app.use(express.static('src'));

console.log('FEFEFE', path.join(__dirname, ''))

app.get('/*', (req, res) => {
    console.log(req.ip, 'page request', req.url);
    res.sendFile(path.resolve(`${__dirname}/../src/login.html`));
});


// app.get('/main.css', function(req, res) {
//     res.sendFile(path.resolve(`${__dirname}/../src/css/main.html`));
// });

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// });
//
// app.all('/secret', function(req, res, next) {
//     console.log('Accessing the secret section ...');
//     next(); // pass control to the next handler
// });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
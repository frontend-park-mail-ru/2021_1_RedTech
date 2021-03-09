const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();
const port = 3000;



app.use(express.static(
    'src'));

app.use(cors())
app.options('*', cors());

app.get('/products', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for  all origins!'})
})

app.use('/favicon.ico', express.static('img/favicon.ico'));

app.get('/templates.js', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../templates.js`));
});

app.get('/*', (req, res) => {
    console.log(req.ip, 'page request', req.url);
    res.sendFile(path.resolve(`${__dirname}/../src/index.html`));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});

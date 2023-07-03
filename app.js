const express = require('express');
const request = require('request');

const app = express();
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({message: 'up'});
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/req/*', (req, res) => {
    var url = req.url.replace("/req/", "");
    console.log(url)
    request(
        { url: `https://aiotube.deta.dev/video/${url}` },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: err.message });
            }

            res.json(JSON.parse(body));
        }
    )
});

module.exports = app;
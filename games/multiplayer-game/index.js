const express = require('express');
const app = express();
const start = require('./server.js');

app.get('/', (req, res) => {
    start();
})

app.listen(3000);
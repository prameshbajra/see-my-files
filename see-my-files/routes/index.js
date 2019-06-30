var express = require('express');
var router = express.Router();

const fs = require("fs");

/* GET home page. */
router.get('/', function (req, res, next) {
    let filesInsideDirectory = fs.readdirSync(`${__dirname}\\..\\..\\`);
    res.render('index', { files: filesInsideDirectory });
});

module.exports = router;

var express = require('express');
var router = express.Router();

const fs = require("fs");
const utility = require("../utility/utility");

/* GET home page. */
router.get('/', function (req, res, next) {
    const filesInsideDirectory = fs.readdirSync(`${process.cwd()}`);
    const filteredFiles = utility.filterFiles(filesInsideDirectory);
    res.render('index', { files: filteredFiles });
});


router.get('/:path', function (req, res, next) {
    const innerFolderPath = req.params.path;
    let filesInsideDirectory = fs.readdirSync(`${process.cwd()}/innerFolderPath`);
    const filteredFiles = utility.filterFiles(filesInsideDirectory);
    res.render('index', { files: filteredFiles });
});

module.exports = router;

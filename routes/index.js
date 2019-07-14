var express = require('express');
var router = express.Router();

const fs = require("fs");
const utility = require("../utility/utility");

/* GET home page. */
router.get(`/`, function (req, res, next) {
    const queryPath = req.query[`path`];
    console.log(queryPath);
    let filesInsideDirectory = ``;
    if (queryPath) {
        filesInsideDirectory = fs.readdirSync(`${process.cwd()}/${queryPath}`);
    } else {
        filesInsideDirectory = fs.readdirSync(`${process.cwd()}`);
    }
    const filteredFiles = utility.filterFiles(filesInsideDirectory);
    res.render(`index`, { files: filteredFiles });
});

module.exports = router;

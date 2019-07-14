var express = require('express');
var router = express.Router();

const fs = require("fs");
const utility = require("../utility/utility");

/* GET home page. */
router.get(`/`, function (req, res, next) {
    const queryPath = req.query[`path`];
    let filesInsideDirectory = ``;
    if (queryPath) {
        filesInsideDirectory = fs.readdirSync(`${process.cwd()}/${queryPath}`, { withFileTypes: true });
    } else {
        filesInsideDirectory = fs.readdirSync(`${process.cwd()}`, { withFileTypes: true });
    }
    const filteredFiles = utility.filterFiles(filesInsideDirectory);
    res.render(`index`, { files: filteredFiles });
});


/* Download file. */
router.get(`/download`, (req, res, next) => {
    const queryPath = req.query[`path`];
    res.download(`${process.cwd()}${queryPath}`);
});


module.exports = router;

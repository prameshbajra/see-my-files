const express = require('express');
const router = express.Router();

const fs = require("fs");
const zipLocal = require('zip-local');
const utility = require("../utility/utility");

/* GET home page. */
router.get(`/`, function (req, res, next) {
    const queryPath = req.query[`path`];
    let filesInsideDirectory = ``;
    if (queryPath) {
        filesInsideDirectory = fs.readdirSync(`${process.cwd()}/${queryPath}`, {
            withFileTypes: true
        });
    } else {
        filesInsideDirectory = fs.readdirSync(`${process.cwd()}`, {
            withFileTypes: true
        });
    }
    const filteredFiles = utility.filterFiles(filesInsideDirectory);
    res.render(`index`, {
        files: filteredFiles
    });
});


/* Download file. */
router.get(`/download`, (req, res, next) => {
    const queryPath = req.query[`path`];
    res.download(`${process.cwd()}${queryPath}`);
});


/* Download folder as zip. */
router.get(`/downloadFolderAsZip`, (req, res, next) => {
    const queryPath = req.query[`path`];
    let zipFilePath = `${process.cwd()}/${queryPath}`;
    if (queryPath.includes("/")) {
        zipFilePath = `${process.cwd()}${queryPath}`;
    }
    zipLocal.sync.zip(zipFilePath).compress().save(`${zipFilePath}.zip`);
    res.download(`${zipFilePath}.zip`);
});


module.exports = router;
const express = require(`express`);
const router = express.Router();

const fs = require(`fs`);
const zipLocal = require(`zip-local`);
const utility = require(`../utility/utility`);
const multer = require(`multer`);

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, `./`);
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname);
    }
});

const uploadObject = multer({ storage });

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
    if (queryPath.includes(`/`)) {
        zipFilePath = `${process.cwd()}${queryPath}`;
    }
    zipLocal.sync.zip(zipFilePath).compress().save(`${zipFilePath}.zip`);
    res.download(`${zipFilePath}.zip`);
});


/* File upload logic. */
router.post(`/upload/files`, uploadObject.any(), (req, res, next) => {
    console.log(`Uploaded files are saved.`);
    const fileNames = req.files.map(file => file.filename);
    res.send({
        fileNames: fileNames,
        success: `OK`,
        status: 200
    });
});

module.exports = router;
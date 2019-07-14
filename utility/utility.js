const config = require("../config.json");

const filterFiles = (files) => {
    const filters = config.filesToExclude;
    return files.filter(file => !filters.includes(file.name.toLowerCase()));
}

module.exports = { filterFiles }

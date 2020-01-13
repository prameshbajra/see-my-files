const config = require("../config.json");

const filterFiles = (files) => {
    const filters = config.filesToExclude;
    return files.filter(file => !filters.includes(file.name.toLowerCase()));
}

const getIPAddress = () => {
    const interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];

        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
                return alias.address;
        }
    }
    return '0.0.0.0';
}

module.exports = { filterFiles, getIPAddress }

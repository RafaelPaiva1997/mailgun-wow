var fs = require('fs');

module.exports = {
    files: dir => fs.readdirSync(dir).map(f => f.replace('.js', '')),
    handlers: (files, dir) => files.reduce((acc, curr) => { acc[curr] = require(dir + curr); return acc; }, {}),
}
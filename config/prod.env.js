const pkg = require("../package.json");

module.exports = {
    VERSION: JSON.stringify(pkg.version),
    NODE_ENV: JSON.stringify('production')
}
exports.getIp = () => {
    const os = require("os")
    let iptable = {};
    let ipfaces = os.networkInterfaces()
    for (let dev in ipfaces) {
        ipfaces[dev].forEach((details, alias) => {
            if (details.family === 'IPv4') {
                iptable[dev + (alias ? ':' + alias : '')] = details.address // ?
            }
        })
    }
    for (let key in iptable) {
        return iptable[key];
    }
}
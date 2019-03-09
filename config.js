const fs = require("fs");
const globalConfig = {};

const conf = fs.readFileSync("./server.conf");
const configArr = conf.toString().split("\n");
for (let i = 0; i < configArr.length; i ++) {
    globalConfig[configArr[i].split("=")[0].trim()] = configArr[i].split("=")[1].trim()
}
console.log(globalConfig);
module.exports = globalConfig;
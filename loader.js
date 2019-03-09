
const fs = require("fs");
var globalConfig = require("./config");

const controllerSet = [];
const pathMap = new Map();

const files = fs.readdirSync(globalConfig["web_path"]);

for (let i = 0; i < files.length; i ++) {
    const temp = require("./" + globalConfig["web_path"] + '/' + files[i])
    if (temp.path) {
        for ( let [key, val] of temp.path) {
            if (pathMap.get(key) == null) {
                pathMap.set(key, val);
            } else {
                throw new Error("url path异常" + key)
            }
        }
        controllerSet.push(pathMap)
    }
}
console.log(pathMap)
module.exports = pathMap;
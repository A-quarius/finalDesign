const url = require("url");
const loginDao = require("../dao/loginDao");
const respUtil = require("../util/RespUtil");
const path = new Map();
function login (request, response) {
    const params = url.parse(request.url, true).query;
    loginDao.login(params.username, result => {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "请求成功", result));
        response.end();
    })
}

function resign (request, response) {
    const params = url.parse(request.url, true).query;
    loginDao.resigin(params.username, params.password, params.dao, result => {
        console.log(result);
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "请求成功", result));
        response.end();
    })
}
path.set("/login", login);
path.set("/resign", resign);

module.exports.path = path;
const url = require("url");
const aboutDao = require("../dao/aboutDao");
const timeUtil = require("../util/timeUtil");
const respUtil = require("../util/RespUtil");
const path = new Map();

function insertAboutComments(request, response) {
    const params = url.parse(request.url, true).query;
    aboutDao.insertAboutComments(params.username, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(), result => {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "请求成功" , result))
        response.end();
    })
}
function queryAboutComments(request, response) {
    aboutDao.queryAboutComments( result => {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "请求成功", result));
        response.end();
    })
}
path.set("/insertAboutComments",insertAboutComments);
path.set("/queryAboutComments",queryAboutComments);

module.exports.path = path;
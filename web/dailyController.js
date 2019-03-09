const dailyDao = require("../dao/dailyDao");
const timeUtil = require("../util/timeUtil");
const respUtil = require("../util/RespUtil");

const path = new Map();
//向数据库 写入每日一句
function editDaily(request, response) {
    request.on("data", function (data) {
        dailyDao.insertDaily(data.toString().trim(), timeUtil.getNow(), function(result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null));
            response.end();
        })
    })
}
function querytDaily(request, response) {
    dailyDao.querytDaily( function(result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result));
        response.end();
    })
}

path.set("/editDaily", editDaily);
path.set("/querytDaily", querytDaily);


module.exports.path = path;
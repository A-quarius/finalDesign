const commentsDao = require("../dao/commentsDao");
const url = require("url");
const respUtil = require("../util/RespUtil");
const timeUtil = require("../util/timeUtil");
const captcha = require("svg-captcha");
const path = new Map();

function addCommetns(request, response) {
    const params = url.parse(request.url, true).query;
    commentsDao.addCommetns(params.goodsId, params.parent, params.username, params.comments, params.email,timeUtil.getNow(), timeUtil.getNow(), result => {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    })
}
//生成随机验证码
function queryRandomCode(request, response) {
    const img = captcha.create({fontSize:50,width:100,height:34});
    response.writeHead(200);
    response.write(respUtil.writeResult(img));
    response.end();
}
// 查询评论
function queryComments(request, response) {
    commentsDao.queryComments(result => {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "请求成功", result))
        response.end();
    })
}
function queryCommentsByGoodsId(request, response) {
    const params = url.parse(request.url, true).query;

    commentsDao.queryCommentsByGoodsId(params.goodsId, result => {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "请求成功", result));
        response.end()
    })
}
function queryCommentsByCtime(request, response) {
    commentsDao.queryCommentsByCtime(result => {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "请求成功", result));
        response.end();
    })
}
path.set("/queryCommentsByGoodsId",queryCommentsByGoodsId);
path.set("/queryRandomCode",queryRandomCode);
path.set("/queryComments",queryComments);
path.set("/addCommetns", addCommetns);
path.set("/queryCommentsByCtime", queryCommentsByCtime);


module.exports.path = path;
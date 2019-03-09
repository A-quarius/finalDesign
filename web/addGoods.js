const url = require("url");
const goodsDao = require("../dao/goodsDao");
const timeUtil = require("../util/timeUtil");
const respUtil = require("../util/RespUtil");
const tagsDao = require("../dao/tagsDap");
const tagGoodsMappingDap = require("../dao/tagGoodsMappingDao")
const path = new Map();

// 通过views 排序， 取数量最多的10个
function queryGoodsByView(request, response) {
    goodsDao.quertyGoodsByView(10, result => {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "请求成功" , result));
        response.end();
    })
}
//通过id查询货物
function queryGoodsById(request, response) {
    const params = url.parse(request.url, true).query;
        goodsDao.queryGoodsById(params.goodsId, result => {
            console.log(result)
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "请求成功", result));
            response.end();
            goodsDao.addViews(params.goodsId, result => {

            })
        })


}
// 根据每页多少数据查询货物
function queryGoodsByPage(request, response) {
    const params = url.parse(request.url, true).query;
    goodsDao.queryPageByPage(parseInt(params.page), parseInt(params.pageSize), result => {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
// 添加货物
function addGoods(request, response) {
    const params = url.parse(request.url, true).query;
    // 把用户传进来的空格匹配掉， 把中文逗号匹配为英文逗号
    const tags = params.tags.replace(/ /g, "").replace("，", ",")
    request.on("data", data => {
        goodsDao.insertGoods(params.title, data.toString(), tags, 0, timeUtil.getNow(), timeUtil.getNow(), result => {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", result));
            response.end();
            //向货物表里插入货物时，同时向tags表里添加相应的货物信息
            const goodsId = result.insertId;
            const tagsList = tags.split(",");
            for (let i = 0; i < tagsList.length; i++) {
                if (tagsList[i] == '') { // 如果用户输入空标签
                    continue
                } else { // 从数据库查询该标签
                    queryTag(tagsList[i], goodsId)
                }
            }
        })
    })
}
// 查询分页总数
function queryGoodsCount(request, response) {
    goodsDao.queryGoodsCount(result => {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "成功", result));
        response.end();
    })
}
// 查询标签
function queryTag(tag, goodsId) {
    tagsDao.queryTags(tag, result => {
        if (result == null || result.length == 0) {// 没有标签创建标签，然后插入一个标签和货物的映射
            insertTag(tag, goodsId, timeUtil.getNow(), timeUtil.getNow(), result => {

            })
        } else {// 有标签的话，插入一个标签的货物的映射
            tagGoodsMappingDap.insertTagGoodsMapping(result[0].id, goodsId, timeUtil.getNow(), timeUtil.getNow(), result => {
                    console.log(result)
            })
        }
    });
}
//插入标签
function insertTag(tag, goodsId) {
    tagsDao.insertTags(tag, timeUtil.getNow(), timeUtil.getNow(), result => {
        tagsGoodsMappingDap(result.insertId, goodsId, timeUtil.getNow(), timeUtil.getNow(), result => {

        })
    })
}
// 插入标签和货物的映射
function tagsGoodsMappingDap(tagId, goodsId) {
    tagGoodsMappingDap.insertTagGoodsMapping(tagId, goodsId, timeUtil.getNow(), timeUtil.getNow(), result => {

    })
}
// 查询所有货物
function queryAllGoods(request, response) {
    goodsDao.queryAllGoods(result => {
        console.log(result)

        response.writeHead(200);
        response.write(respUtil.writeResult("success", "请求成功" , result));
        response.end();
    })
}
// 查询所有标签
function queryAllTags(request, response) {
    tagsDao.queryAllTags(result => {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "请求成功", result));
        response.end();
    });
}
path.set("/addGoods", addGoods);
path.set("/queryGoodsByPage", queryGoodsByPage);
path.set("/queryGoodsCount", queryGoodsCount);
path.set("/queryGoodsById", queryGoodsById);
path.set("/queryAllGoods", queryAllGoods);
path.set("/queryAllTags", queryAllTags);
path.set("/queryGoodsByView", queryGoodsByView);




module.exports.path = path;

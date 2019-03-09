const url = require("url");
const respUtil = require("../util/RespUtil");
const tags_goods_mappingDao = require("../dao/tagGoodsMappingDao");
const queryGoodsBGroup = require("../util/queryGoodsByGroupUtil");
const path = new Map();
// 随机标签云，通过点击一个标签 筛选出所有包含该标签的货物
function queryGoodsByTagsId(request, response) {
    const params = url.parse(request.url, true).query;
        tags_goods_mappingDao.queryGoodsByTagsId(params.id, result => {//通过id查找到对应的goods_id
            queryGoodsBGroup.queryGoodsBGroup(result)
            .then( res => {
                response.writeHead(200);
                response.write(respUtil.writeResult("success", "请求成功", res));
                response.end();
            })
        })
}



path.set("/queryGoodsByTagsId", queryGoodsByTagsId);
module.exports.path = path;



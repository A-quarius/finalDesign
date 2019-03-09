const DButil = require("./DButil");
function insertTagGoodsMapping(tag_id, good_id, ctime, utime, success) {
    const insertSql = "insert into tag_goods_mapping(tag_id, goods_id, ctime, utime) values(?,?,?,?)";
    const params = [tag_id, good_id, ctime, utime];
    const connection = DButil.createConnection();
    connection.query(insertSql, params, (err, result) => {
        if (err == null) {
            success(result)
        } else {
            console.log(err)
        }
    });
    connection.end()
}
//通过tag_id 查找goods_id
function queryGoodsByTagsId(tag_id, success) {
    const querySql = "select goods_id from tag_goods_mapping where tag_id = ?";
    const params = [tag_id];
    const connection = DButil.createConnection();
    connection.query(querySql, params, (err, result) => {
        if (err == null) {
            success(result)
        } else {
            console.log(err)
        }
        connection.end();
    });
}
//通过货物id 查找到对应的货物
function queryGoodsByGoodsId(goods_id, success) {
    let b = 0;
    const querySql = "select * from goods where id = ?";
    const params = [goods_id];
    const connection = DButil.createConnection();
    connection.query(querySql, params, (err, result) => {
        if (err == null) {
            success(result)
        } else {
            console.log(err)
        }
        connection.end();
    });
}

module.exports.insertTagGoodsMapping = insertTagGoodsMapping;
module.exports.queryGoodsByTagsId = queryGoodsByTagsId;
module.exports.queryGoodsByGoodsId = queryGoodsByGoodsId;
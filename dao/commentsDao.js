const DButil = require("./DButil");
//添加评论
function addCommetns(goodsId, parent, username, comments, email, ctime, utime, success) {
    const insetSql = "insert into comments(goods_id, parent, username, comments, email, ctime, utime) values(?, ?, ?, ?, ?, ?, ?);";
    const params = [goodsId, parent, username, comments, email, ctime, utime];
    const connection = DButil.createConnection();
    connection.query(insetSql, params, (err, result) => {
        if (err == null) {
            success(result)
        } else {
            console.log(err)
        }
        connection.end()
    });
}
// 查询评论
function queryComments(success) {
     const insetSql = "select * from comments order by id desc limit 7;";
     const connection = DButil.createConnection();
     connection.query(insetSql, (err, result) => {
         if (err == null) {
             success(result)
         } else {
             console.log(err)
         }
         connection.end();
     })
}
// 通过货物id值 查询评论
function queryCommentsByGoodsId(goodsId, success) {
    const querySql = "select * from comments where goods_id = ?";
    const params = [goodsId];
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
// 查询最新的7条评论
function queryCommentsByCtime(success) {
    const quertSql = "select * from comments order by ctime desc limit 7"
    const params = []
    const connection = DButil.createConnection();

    connection.query(quertSql, params, (err, result) => {
        if (err == null) {
            success(result)
        } else {
            console.log(err)
        }
        connection.end();
    })
}
module.exports.addCommetns = addCommetns;
module.exports.queryComments = queryComments;
module.exports.queryCommentsByGoodsId = queryCommentsByGoodsId;
module.exports.queryCommentsByCtime = queryCommentsByCtime;
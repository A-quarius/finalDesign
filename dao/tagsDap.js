const DButil = require("./DButil");
// 添加添加标签
function insertTags(tag, ctime, utime, success) {
    const insertSql = "insert into tags(tag, ctime, utime) values(?,?,?);";
    const params = [tag, ctime, utime];

    const connection = DButil.createConnection();
    connection.query(insertSql, params, (err, result) => {
        if (err == null) {
            success(result)
        } else {
            console.log(err)
        }
        connection.end()
    })
}
// 查询标签是否存在
function queryTags(tag, success) {
    const insertSql = "select * from tags where tag = ?;";
    const params = [tag];
    const connection = DButil.createConnection();
    connection.query(insertSql, params, (err, result) => {
        if (err == null) {
            success(result)
        } else {
            console.log(err)
        }
        connection.end()
    });
}
// 查询所有标签
function queryAllTags(success) {
    const querySql = "select * from tags";
    const params = [];
    const connection = DButil.createConnection();
    connection.query(querySql, params, (err, result) => {
        if (err == null) {
            success(result)
        } else {
            console.log(err)
        }
        connection.end()
    });
}
module.exports.insertTags = insertTags;
module.exports.queryTags = queryTags;
module.exports.queryAllTags = queryAllTags;
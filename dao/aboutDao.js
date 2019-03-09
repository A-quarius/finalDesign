const DButil = require("./DButil");

function insertAboutComments(username, email, content,ctime, utime, success) {
    const insertSql = "insert into about_comments(username, email, content,ctime, utime) values(?,?,?,?,?);";
    const params = [username, email, content,ctime, utime];
    const connection = DButil.createConnection();
    connection.query(insertSql, params, (err, result) => {
        if (err == null) {
            success(result)
        } else {
            console.log(err)
        }
        connection.end();
    });

}
function queryAboutComments( success) {
    const querySql = "select * from about_comments;";
    const connection = DButil.createConnection();
    connection.query(querySql, (err, result) => {
        if (err == null) {
            success(result)
        } else {
            console.log(err)
        }
        connection.end();
    });

}
module.exports.insertAboutComments = insertAboutComments;
module.exports.queryAboutComments = queryAboutComments;
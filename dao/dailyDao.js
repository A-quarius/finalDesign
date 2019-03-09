const DButil = require("./DButil");

function insertDaily(content, ctime, success) {
    const insertSql = "insert into daily(content,ctime) values (?, ?)";
    const params = [content, ctime];
    const connection = DButil.createConnection();
    connection.connect();
    connection.query(insertSql, params, (err, result) => {
        if (err == null) {
            success(result)
        } else {
            console.log(err)
        }
        connection.end();
    });
}
function querytDaily(success) {
    const querySql = "select * from daily order by id desc limit 1;";
    const connection = DButil.createConnection();
    connection.connect();
    connection.query(querySql, (err, result) => {
        if (err == null) {
            success(result)
        } else {
            console.log(err)
        }
        connection.end();
    });
}

module.exports.insertDaily = insertDaily;
module.exports.querytDaily = querytDaily;

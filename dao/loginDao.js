const DBUtil = require("./DButil");

function login(username, success) {
    const querySql = "select * from user where username = ?";
    const params = [username];
    const connection = DBUtil.createConnection();

    connection.query(querySql, params, (err, result) => {
        if (err == null) {
            success(result)
        } else {
            console.log(err)
        }
    })
}

function resign(username, password, userdao, success) {
    const insertSql = "insert into user(username, userpwd, userdao) values(?,?,?)";
    const params = [username, password, userdao];

    const connection = DBUtil.createConnection();
    connection.query(insertSql, params, (err, result) => {
        console.log(result)
        if (err == null) {
            console.log(result)
        } else {
            console.log(err)
        }
        connection.end();
    })

}
module.exports.login = login;
module.exports.resigin = resign;
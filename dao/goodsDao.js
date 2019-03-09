const DButil = require("./DButil");

// 插入货物
function insertGoods(title, content, tags, views, ctime, utime, success) {
    const insertSql = "insert into goods(title, content, tags, views, ctime, utime) values(?,?,?,?,?,?);";
    const params = [title, content, tags, views, ctime, utime];
    const connection = DButil.createConnection();
    connection.connect();
    connection.query(insertSql, params, (err, result) => {
        if (err == null) {
            success(result)
        } else {
            console.log(err)
        }
    });
    connection.end()
}
//通过id查询货物
function queryGoodsById(id, success) {
    const querySql = "select * from goods where id = ?;";
    const params = [id];
    const connection = DButil.createConnection();
    connection.query(querySql, params, (err, result) => {
        if (err == null) {
            success(result)
        } else {
            console.log(err)
        }
    });
    connection.end();
}

// 通过每页多少条数据查询货物
function queryPageByPage(page, pageSize, success) {
        const querySql = "select * from goods order by id desc limit ?, ?;";
        const params = [page, pageSize];
        const connection = DButil.createConnection();
        connection.query(querySql, params, (err, result) => {
            if (err == null) {
                success(result)
            } else {
                console.log(err)
            }
        });
        connection.end();
}
// 查询货物总数
function queryGoodsCount(success) {
    const querySql = "select count(1) as count from goods;";
    const params = [];
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
// 查询所有货物
function queryAllGoods(success) {
    const querySql = "select * from goods";
    const params =[];
    const connection = DButil.createConnection();
    connection.query(querySql, params, (err, result) => {
        if (err == null) {
            success(result);
        } else {
            console.log(err)
        }
        connection.end();
    });
}
// 每次查询，views + 1
function addViews(id, success) {
    const querySql = "update goods set views = views + 1 where id = ?";
    const params =[id];
    const connection = DButil.createConnection();
    connection.query(querySql, params, (err, result) => {
        if (err == null) {
            success(result);
        } else {
            console.log(err)
        }
        connection.end();
    });
}
// 通过views倒序，取前10的货物
function quertyGoodsByView(page, success) {
    const querySql = "select * from goods order by views desc limit ?";
    const params = [page];
    const connection = DButil.createConnection();
    connection.query(querySql, params, (err, result) => {
        if (err == null) {
            success(result)
        } else {
            console.log(err)
        }
        connection.end();
    })
}

module.exports.insertGoods = insertGoods;
module.exports.queryPageByPage = queryPageByPage;
module.exports.queryGoodsCount = queryGoodsCount;
module.exports.queryGoodsById = queryGoodsById;
module.exports.queryAllGoods = queryAllGoods;
module.exports.addViews = addViews;
module.exports.quertyGoodsByView = quertyGoodsByView;


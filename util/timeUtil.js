// 封装一个获取当前时间工具

function getNow() {
    return parseInt(Date.now() / 1000);
}

module.exports.getNow = getNow;
//封装一个格式化返回值函数
function writeResult(status, msg, data) {
    return JSON.stringify({status: status, msg: msg, data: data});
}

module.exports.writeResult = writeResult;
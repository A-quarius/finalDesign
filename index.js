const express = require("express");
const globalConf = require("./config");
const loader = require("./loader");
const app = new express();
// app.use(express.static("./page/"));
app.use(express.static(__dirname+"/page",{index:"login.html"}));
// 每日一句
app.post("/editDaily", loader.get("/editDaily"));
app.get("/querytDaily", loader.get("/querytDaily"));
// 添加及查询货物
app.post("/addGoods", loader.get("/addGoods"));
app.get("/queryGoodsByPage", loader.get("/queryGoodsByPage"));
app.get("/queryGoodsCount", loader.get("/queryGoodsCount"));
app.get("/queryGoodsById", loader.get("/queryGoodsById"));
app.get("/queryAllGoods", loader.get("/queryAllGoods"));
app.get("/queryGoodsByTagsId", loader.get("/queryGoodsByTagsId"));
app.get("/queryGoodsByView", loader.get("/queryGoodsByView"));

// 添加及查找评论
app.get("/addCommetns", loader.get("/addCommetns"));
app.get("/queryComments", loader.get("/queryComments"));
app.get("/insertAboutComments", loader.get("/insertAboutComments"));
app.get("/queryAboutComments", loader.get("/queryAboutComments"));
app.get("/queryCommentsByGoodsId", loader.get("/queryCommentsByGoodsId"));
app.get("/queryCommentsByCtime", loader.get("/queryCommentsByCtime"));


// 生成验证码
app.get("/queryRandomCode", loader.get("/queryRandomCode"));

//查询标签
app.get("/queryAllTags", loader.get("/queryAllTags"));
// 注册登录
app.get("/login", loader.get("/login"));
app.get("/resign", loader.get("/resign"));

app.listen(globalConf.port, function () {
    console.log("服务已启动")
});
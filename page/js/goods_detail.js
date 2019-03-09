const goods_detail = new Vue({
    el: "#goods_detail",
    data: {
        title: "",
        content: "",
        tags: "",
        ctime: "",
        views: ""
    },
    methods: {
        //页面加载时，判断是否有参数goods_id，如果有就根据这个goods_id去请求数据；
        queryGoodsById() {
            const searchUrlParams = location.search.indexOf("?") == -1 ? "" : location.search.split("?")[1].split("&"); // 通过url 找出所有的参数，放进searchUrlParams数组中
            if (searchUrlParams == "") { // 如果没有参数， 直接结束
                return
            }
            let goodsId = -1;
            // 遍历数组，找到goodsID对应的值，作为axios的参数 发送请求
            for (let i = 0; i < searchUrlParams.length; i ++) {
                if (searchUrlParams[i].split("=")[0] == "goodsId") {
                    try {
                        goodsId = parseInt(searchUrlParams[i].split("=")[1])
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
            axios({
                methods: "get",
                url: "/queryGoodsById?goodsId=" + goodsId
            }).then( res => {
                const goodsList = res.data.data;
                for (let i = 0; i < goodsList.length; i ++) {
                    this.title = goodsList[i].title;
                    this.content = goodsList[i].content;
                    this.tags = goodsList[i].tags;
                    this.ctime = goodsList[i].ctime;
                    this.views = goodsList[i].views
                }

            })
        },
        //通过点击随机标签云里的tag，获取包含该tag的所有货物
        getGoodsByTagsId(tagsId) {
            axios({
                methods: "get",
                url: "queryGoodsByTagsId?id=" + tagsId
            }).then(res => {
                const temp = {};
                for (let i = 0; i < res.data.data.length; i ++) {
                    const data = res.data.data[i];
                    temp.title = data[0].title;
                    temp.content = data[0].content;
                    temp.ctime = data[0].ctime;
                    temp.views = data[0].views;
                    temp.tags = data[0].tags;
                    temp.link = "/goods_detail.html?goodsId=" + data[0].id;
                    goods.goodsList.push(temp)
                }
            })
        }
    },
    computed () {

    },
    created () {
        this.queryGoodsById();
    }
});

const sendComments = new Vue({
    el: "#sendComments",
    data: {
        randomCode: ''
    },
    computed: {
        sendComments () {
            return function () {
                const searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                if (searchUrlParams == "") {
                    return
                }
                let goodsId = -1;
                for (let i = 0; i < searchUrlParams.length; i ++ ) {
                    if (searchUrlParams[i].split("=")[0] == "goodsId") {
                        try {
                            goodsId = searchUrlParams[i].split("=")[1];
                        } catch (e) {
                            console.log(e)
                        }
                    }
                }
                let reply = document.getElementById("reply").value;
                let name = document.getElementById("comments_name").value;
                let email = document.getElementById("comments_email").value;
                let content = document.getElementById("comments_content").value;
                let comments_code = document.getElementById("comments_code").value;
                // const reply = document.getElementById("reply");
                if (comments_code != sendComments.randomCode.text) {
                    alert("验证码错误");
                    return;
                }
                axios({
                    methods: "get",
                    url: "/addCommetns?goodsId=" + goodsId + "&parent=" + reply + "&username=" + name + "&comments=" + content + "&email=" + email
                }).then( res => {
                    alert(res.data.msg);
                    name = "";
                    email = "";
                    content = "";

                    goods_comments.getCommentsByGoodsId();
                }).catch(e => {
                })
            }
        }
    },
    methods: {
        queryRandomCode() {
            axios({
                methods: "get",
                url:"/queryRandomCode"
            }).then(res => {
                this.randomCode = res.data.status;
            })
        },
        changeCode() {
            this.queryRandomCode()
        }
    },
    created () {
        this.queryRandomCode();
    }


});

const goods_comments = new Vue({
    el: "#goods_comments",
    data: {
        goods_comments_id: []
    },
    methods: {
        getCommentsByGoodsId() {
            const searchUrlParmas = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
            if (searchUrlParmas == "") {
                return;
            }
            let goodsId = -1;
            for (let i = 0; i < searchUrlParmas.length; i ++) {
                if (searchUrlParmas[i].split("=")[0] == "goodsId") {
                    try {
                        goodsId = searchUrlParmas[i].split("=")[1];
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
            axios({
                methods: "get",
                url: "/queryCommentsByGoodsId?goodsId=" + goodsId
            }).then(res => {
                this.goods_comments_id = res.data.data;
            })
        }
    },
    created () {
        this.getCommentsByGoodsId();
    }
});
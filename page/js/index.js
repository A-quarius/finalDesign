const daily = new Vue({
    el: '#daily',
    data: {
        content: "fasdfasdf"
    },
    computed: {
        getContent() {
            return this.content
        }
    },
    created() {
        //页面初始化时候，请求数据
        axios({
            method: 'get',
            url:'/querytDaily',
        }).then(res => {
            this.content = res.data.data[0].content;
        })
    },
});

const goods = new Vue({
    el: '#goodsList',
    data: {
        page: 1,
        pageSize : 5,
        totalCount: 100,
        pageNumList: [],
        goodsList : [],
    },
    computed: {
        // 获取数据
        getData() {
            return function (page, pageSize) {
                axios({
                    method: "get",
                    url: "queryGoodsByPage?page=" + (page -1 ) + "&pageSize=" + pageSize
                }).then( res => {
                    let list = [];
                    var res = res.data.data;
                    for (let i = 0; i < res.length; i ++) {
                        let temp = {};
                        temp.title = res[i].title;
                        temp.content = res[i].content;
                        temp.ctime = res[i].ctime;
                        temp.views = res[i].views;
                        temp.tags = res[i].tags;
                        temp.link = "/goods_detail.html?goodsId=" + res[i].id;
                        list.push(temp)
                    }
                    goods.goodsList = list;
                    goods.page = page;
                });

                axios({
                    method: "get",
                    url: "/queryGoodsCount"
                }).then( res => {
                    // 这里需要把this.generatePageTool 放在里面，不然totalCount 还是之前的，因为then是异步
                    goods.totalCount = res.data.data[0].count;
                    this.generatePageTool();
                })
            }
        },

        //翻页 重新请求数据
        jumpPage() {
            return function (page) {
                this.getData(page, this.pageSize)
            }
        }

    },
    methods: {// 请求留言
        queryComments() {
            axios({
                methods: "get",
                url: "/queryComments"
            }).then(res => {
                // console.log(res)
            })
        },
        // 翻页插件
        generatePageTool() {
            const nowPage = this.page;
            const pageSize = this.pageSize;
            const totalCount = this.totalCount;
            const result = [];
            result.push({text:"<<", page: 1});
            if (nowPage > 2) {
                result.push({text: nowPage - 2, page: nowPage -2})
            }
            if (nowPage > 1) {
                result.push({text: nowPage - 1, page: nowPage -1})
            }
            result.push({text: nowPage , page: nowPage })
            if (nowPage + 1 <= (totalCount + pageSize -1) / pageSize ) {
                result.push({text: nowPage + 1, page: nowPage + 1})
            }
            if (nowPage + 2 <= (totalCount + pageSize -1) / pageSize ) {
                result.push({text: nowPage + 2, page: nowPage + 2})
            }
            result.push({text: ">>", page: parseInt((totalCount + pageSize - 1) / pageSize)});
            this.pageNumList = result;
        },
    },
    created() {
        this.getData(this.page, this.pageSize);
        this.queryComments();

    }
});


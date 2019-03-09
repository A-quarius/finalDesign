const goodsList = new Vue({
    el: "#goodsList",
    data: {
        goodsList: [],
        tagsList: []
    },
    methods: {
        getAllGoods() {
            axios({
                methods: "get",
                url: "/queryAllGoods"
            }).then( res => {
                const list = [];
                const data = res.data.data;
                for (let i = 0; i < data.length; i ++) {
                    const temp = {};
                    temp.title = data[i].title;
                    temp.tags = data[i].tags;
                    temp.link = "/goods_detail.html?goodsId=" + data[i].id;
                    list.push(temp);
                }
                goodsList.goodsList = list;
            })
        },
        getAllTags() {
            axios({
                methods: "get",
                url: '/queryAllTags'
            }).then( res => {
                goodsList.tagsList = res.data.data;
            })
        },

    },
    created() {
        this.getAllGoods();
        this.getAllTags();
    }
});
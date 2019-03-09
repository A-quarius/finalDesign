const randomTags = new Vue({
    el: '#randomTags',
    data: {
        tags: []
    },
    computed: {
        randomColor() {
            return function () {
                const red = Math.random() * 255;
                const blue = Math.random() * 255;
                const green = Math.random() *255;
                return "rgb(" + red + "," + blue + "," + green + ")";
            }
        },
        randomSize() {
            return function () {
                const size = (Math.random() * 20 + 12) + 'px';
                return size;
            }
        }
    },
    methods: {
        getAllTags() {
            axios({
                methods: "get",
                url: '/queryAllTags'
            }).then( res => {
                this.tags = res.data.data;
            })
        },
        getGoodsByTagsId(tagsId) {
                axios({
                    methods: "get",
                    url: "queryGoodsByTagsId?id=" + tagsId
                }).then( res => {
                    const data = res.data.data;
                    const tempList = [];
                    for (let i = 0; i < data.length; i ++) {
                        const temp = {};
                        temp.id = data[i].id;
                        temp.title = data[i].title;
                        temp.content = data[i].content;
                        temp.tags = data[i].tags;
                        temp.views = data[i].views;
                        temp.link = "/goods_detail.html?goodsId=" + data[i].id;
                        tempList.push(temp)
                    }
                    goods.goodsList = tempList;
                    console.log(goods.goodsList)
                })
        }
    },
    created() {
        this.getAllTags();
    },
});
const newHot = new Vue({
    el: '#newHot',
    data: {
        titleList:[]
    },
    methods: {
      queryGoodsByView() {
          axios({
              methods: "get",
              url: "/queryGoodsByView"
          }).then( res => {
              const data = res.data.data;
              const list = [];
              for (let i = 0; i < data.length; i ++) {
                  const temp = {};
                  temp.content = data[i].content;
                  temp.title = data[i].title;
                  temp.link = "/goods_detail.html?goodsId=" + data[i].id
                  temp.views = data[i].views;
                  list.push(temp)
              }
              this.titleList = list;
          })
      }
    },
    created() {
        this.queryGoodsByView();
    },
});

const newComment = new Vue({
    el: '#newComment',
    data: {
        commentList: []
    },
    created() {
        this.queryCommentsByCtime();
    },
    methods: {
        queryCommentsByCtime() {
            axios({
                methods: "get",
                url: "/queryCommentsByCtime"
            }).then( res => {
                console.log(res)
                const data = res.data.data;
                const list = [];
                for (let i = 0; i < data.length; i ++) {
                    const temp = {};
                    temp.name = data[i].username;
                    temp.date = data[i].ctime;
                    temp.comment = data[i].comments;
                    temp.link = "/goods_detail.html?goodsId=" + data[i].goods_id;
                    list.push(temp)
                }
                this.commentList = list;
            })
        }
    }
})

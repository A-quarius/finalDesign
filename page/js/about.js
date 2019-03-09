const aboutComments = new Vue({
    el: "#aboutComments",
    data: {
        randomCode: '',
        page: 1,
        pageSize: 5,
        aboutComments: []
    },
    computed: {

    },
    methods: {
        //发送评论内容
        sendComments () {
                const name = document.getElementById("comments_name").value;
                const email = document.getElementById("comments_email").value;
                const content = document.getElementById("comments_content").value;
                const comments_code = document.getElementById("comments_code").value;
                const reply = document.getElementById("reply");
                if (comments_code != aboutComments.randomCode.text) {
                    alert("验证码错误")
                    return;
                }
                axios({
                    methods: "get",
                    url: "/insertAboutComments?username=" + name  + "&email=" + email + "&content=" + content
                }).then( res => {
                    alert(res.data.msg);
                    this.queryAboutComments()
                }).catch(e => {
                    console.log(e)
                })
        },
        //生成验证码
        queryRandomCode() {
            axios({
                methods: "get",
                url:"/queryRandomCode"
            }).then(res => {
                this.randomCode = res.data.status;
            })
        },
        // 改变验证码
        changeCode() {
            this.queryRandomCode()
        },
        // 查询评论内容
        queryAboutComments() {
            axios({
                methods: "get",
                url: "queryAboutComments"
            }).then(res  => {
                aboutComments.aboutComments = res.data.data;
                return this.aboutComments.aboutComments
            })
        }

    },
    created () {
        this.queryRandomCode();
        this.queryAboutComments()
    }


});


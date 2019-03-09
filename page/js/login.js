const login = new Vue({
    el: "#login",
    data: {

    },
    methods: {
        login() {
            const username = document.getElementsByClassName("username")[0].value;
            const password = document.getElementsByClassName("password")[0].value;
            if (username !== null && password !== null) {
                axios({
                    methods: "get",
                    url: "login?username=" + username + "&password=" + password
                }).then( res => {
                    const data = res.data.data;
                    console.log(data[0].userpwd)
                    if (data[0].userpwd == password) {
                        window.location.href = "./index.html";
                    } else {
                        console.log("密码错误")
                    }
                })
            }
        }
    },

});
const resign = new Vue({
    el: "#resign",
    data: {

    },
    methods: {
        resign() {
            const username = document.getElementsByClassName("username")[0].value;
            const password = document.getElementsByClassName("password")[0].value;
            const dao = document.getElementsByClassName("dao")[0].value;
            if (username  &&password && dao ) {
                console.log("1")
                axios({
                    methods: "get",
                    url: "/resign?username=" + username + "&password=" + password + "&dao=" + dao
                }).then( res => {
                    console.log(res)
                })
            }
        }
    }
});


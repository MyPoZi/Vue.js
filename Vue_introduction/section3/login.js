Vue.component('user-login',{
        template: '<div id="login-template">\n' +
            '        <div>\n' +
            '          <input type="text" placeholder="ログインID" v-model="userid">\n' +
            '        </div>\n' +
            '        <div>\n' +
            '            <input type="password" placeholder="パスワード" v-model="password">\n' +
            '        </div>\n' +
            '        <button @click="login()">ログイン</button>\n' +
            '      </div>',
        data: function () {
            return {
                userid: '',
                password: ''
            }
        },
        methods: {
            login: function () {
                auth.login(this.userid, this.password);
            }
        }
    })
// ログインダミー
var auth = {
    login: function (id, password) {
        window.alert("userid" + id + "\n" +  "password" + password);
    }
}

new Vue({
    el: "#login-example"
})
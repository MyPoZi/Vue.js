// JSONを返す関数
// この関数を用いて擬似的にWeb API経由で情報を取得したようにする
var getUsers = function (callback) {
    setTimeout(function () {
        callback(null, [
            {
                id: 1,
                name: 'MyPoZi'
            },
            {
                id: 2,
                name: 'MyZiPo'
            }
        ])
    }, 1000)
}

var UserList = {
    template: `
    <div>
        <div class="loading" v-if="loading">読み込み中</div>
        <div v-if="error" class="error">
            {{ error}}
        </div>
        <!--usersがロードされたら各ユーザーの名前を表示する-->
        <div v-for="user in users" :key="user.id">
            <h2>{{ user.name }}</h2>
        </div>
    </div>
    `,
    data: function () {
        return {
            loading: false,
            users: function () {
                return []
            }, // 初期値の空配列
            error: null
        }
    },

    //初期化時にデータを取得する
    created: function () {
        this.fetchData()
    },

    // $routeの変更をwatchすることでルーティングが変更された時に再度データを取得
    watch: {
        '$route': 'fetchData'
    },

    methods: {
        fetchData: function () {
            this.loading = true
            // 取得したデータの結果をusersに格納する
            // Function.prototype.bindはthisのスコープを渡すために利用
            getUsers((function (err, users) {
                this.loading = false
                if (err) {
                    this.error = err.toString()
                } else {
                    this.users = users
                }
            }).bind(this))
        }
    }
}


// ルートオプションを渡してルータインスタンスを生成
var router = new VueRouter({
    // コンポーネントをマッピングしたルート定義を配列で渡す
    routes: [
        {
            path: '/top',
            component: {
                template: '<div>トップページです。</div>'
            }
        },
        {
            path: '/users',
            component: UserList
        }
    ]
})

// ルータのインスタンスをrootとなるVueインスタンスに渡す
var app = new Vue({
    router: router
}).$mount('#app')
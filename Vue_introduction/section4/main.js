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

var getUser = function (userId, callback) {
    setTimeout(function () {
        var filteredUsers = userData.filter(function (user) {
            return user.id === parseInt(userId, 10)
        })
        callback(null, filteredUsers && filteredUsers[0]) // filteredUsers必要??
    }, 1000)
}

var userData = [
    {
        id: 1,
        name: 'MyPoZi',
        description: 'エンジニアです'
    },
    {
        id: 2,
        name: 'MyZiPo',
        description: 'プログラマです'
    }
]

// 擬似的にAPI経由で情報を更新したようにする
// 実際のWebアプリケーションではServerへPOSTリクエストを行う
var postUser = function (params, callback) {
    setTimeout(function () {
        // idは追加されるごとに自動的にincrementされていく
        params.id = userData.length + 1
        userData.push(params)
        callback(null, params)
    }, 1000)
}

// ユーザ新規登録コンポーネント
var UserCreate = {
    template: `
    <div>
        <div class="sending" v-if="sending">Sending...</div>
        <div>
            <h2>新規ユーザー作成</h2>
            <div>
                <label>名前：</label>
                <input type="text" v-model="user.name">
            </div>
            <div>
                <label>説明文：</label>
                <textarea v-model="user.description"></textarea>
            </div>
            <div v-if="error" class="error">
                {{ error }}
            </div>
            <div>
                <input type="button" @click="createUser" value="送信">
            </div>
        </div>
    </div>
    `,
    data: function () {
        return {
            sending: false,
            user: this.defaultUser(),
            error: null
        }
    },

    created: function () {
    },

    methods: {
        defaultUser: function () {
            return {
                name: '',
                description: ''
            }
        },

        createUser: function () {
            // 入力パラメータのバリデーション
            if (this.user.name.trim() === '') {
                this.error = 'Nameは必須です'
                return
            }
            if (this.user.description.trim() === '') {
                this.error = 'Descriptionは必須です'
                return
            }
            postUser(this.user, (function (err, user) {
                this.sending = false
                if (err) {
                    this.error = err.toString()
                } else {
                    this.error = null
                    // デフォルトでフォームをリセット
                    this.user = this.defaultUser()
                    alert('新規ユーザーが登録されました')
                    // ユーザ一覧ページに戻る
                    this.$router.push('/users')
                }
            }).bind(this))
        }
    }
}

// 詳細ページのコンポーネント
var UserDetail = {
    template: `
    <div>
        <div class="loading" v-if="loading">読み込み中...</div>
        <div v-if="error" class="error">
            {{ error }}
        </div>
        <div v-if="user">
            <h2>{{ user.name }}</h2>
            <p>{{ user.description }}</p>
        </div>
    </div>
    `,
    // 初期値のセット
    data: function () {
        return {
            loading: false,
            user: null,
            error: null
        }
    },

    created: function () {
        this.fetchData()
    },

    watch: {
        '$route': 'fetchData'
    },

    methods: {
        fetchData: function () {
            this.loading = true
            // this.$route.params.userIdに現在のURL上のパラメータに対応したuserIdが格納される
            getUser(this.$route.params.userId, (function (err, user) {
                this.loading = false
                if (err) {
                    this.error = err.toString()
                } else {
                    this.user = user
                }
            }).bind(this))
        }
    }


}

var UserList = {
    template: `
    <div>
        <div class="loading" v-if="loading">読み込み中</div>
        <div v-if="error" class="error">
            {{ error }}
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
        },
        {
            path: '/users/new',
            component: UserCreate
        },
        {
            path: '/users/:userId',
            component: UserDetail
        }
    ]
})

// ルータのインスタンスをrootとなるVueインスタンスに渡す
var app = new Vue({
    router: router
}).$mount('#app')
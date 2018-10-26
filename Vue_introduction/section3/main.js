Vue.component('fruits-list-title', {
    template: '<h1>フルーツ一覧</h1>'
})
Vue.component('fruits-list-description', {
    template: '<p>季節の代表的なフルーツの一覧です</p>'
})
Vue.component('fruits-list-table', {
    template: `
    <table>
        <tr>
            <th>季節</th>
            <th>フルーツ</th>
        </tr>
        <tr>
            <td>春</td>
            <td>いちご</td>
        </tr>
    </table>   
`
})

Vue.component('item-desc', {
    props: {
        itemName: {
            type: String
        }
    },
    template: '<p>{{ itemName }}は便利です</p>'
})
Vue.component('fruits-item-name', {
    props: {
        fruitsItem: { // テンプレート中ではケバブケース
            type: Object, // オブジェクトかどうか
            required: true // このコンポーネントには必須なのでtrue
        }
    },
    template: '<li>{{ fruitsItem.name }}</li>'
})
var headerTemplate = `
    <div style="color: gray;">
        <slot name="header">※親から何も渡ってこない場合、この文が表示</slot>
    </div>
`
Vue.component('page-header',{
    template: headerTemplate
})
new Vue({
    el:"#header"
})

new Vue({
    el: '#fruits-component',
    data: {
        fruitsItem: [
            {name: '梨'},
            {name: 'イチゴ'}
        ]
    }
})
new Vue({
    el: '#fruits-list',
})
new Vue({
    el: '#app',
    data: {myItem: 'pen'}
})
// 子コンポーネントのカウンターボタン
var counterButton = Vue.extend({
    template: '<span>{{counter}}個<button v-on:click="addToCart">追加</button></span>',
    data: function () {
        return {
            counter: 0
        }
    },
    methods: {
        addToCart: function () {
            this.counter += 1
            this.$emit('increment') // incrementカスタムイベントの発火
        }
    },
})
// 親コンポーネントのカート
new Vue({
    el: '#fruits-counter',
    components: {
        'counterButton': counterButton
    },
    data: {
        total: 0,
        fruits: [
            {name: '梨'},
            {name: 'イチゴ'}
        ]
    },
    methods: {
        incrementCartStatus: function () {
            this.total += 1
        }
    }
})
Vue.directive('red', {
    bind: function (el) {
        el.style.color = 'red';
    }
});
Vue.directive('bold', {
    bind: function (el) {
        el.style.fontWeight = 'bold';
    }
});

Vue.component('my-cpmponent', {
    props: ['message'],
    template: '<p style="border:1px solid #ccc;">{{ message }}</p>'
});
Vue.component('my-cpmponent-2', {
    props: ['items'],
    template: '#my-template2'
});

function initial() {

    new Vue({
        el: '#msg',
        data: {
            val: '',
            message: 'this is message',
            data: [],
        },
        methods: {
            myfunc:function () {
                this.message = this.val;
            }
        }
    })
}
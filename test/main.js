function initial() {
    new Vue({
        el: '#msg',
        data: {
            message: 'this is Vue.js sample!',
            inputData: '',
            actionMessage: ''
        },
        methods: {
            doAction: function () {
                var str = this.text1;
                this.actionMessage = 'you typed:' + str + '.';
            }
        }
    })
}
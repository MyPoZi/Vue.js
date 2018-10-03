function initial() {
    new Vue({
        el: '#msg',
        data: {
            message: 'this is Vue.js sample!',
            inputData: '',
            actionMessage: '',
            messageCss: '',
            msgArray:[],
            messagePush: '',
        },
        created: function() {
            this.msgArray.push('sample message.');
            this.messagePush = this.msgArray;
        },
        methods: {
            doAction: function () {
                var str = this.text1;
                this.actionMessage = 'you typed:' + str + '.';
            },
            doActionPush: function () {
                this.msgArray.push(this.text2);
                this.messagePush = this.msgArray;

            }
        }
    })
}
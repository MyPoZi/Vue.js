function initial() {

    new Vue({
        el: '#msg',
        data: {
            number: '0',
            woTax: '0',
            isA: true,
            isB: false,
            selfF: '',
            selfB: '',
            flg: false,
            data:[
                'Hello',
                'Welcome',
                'Good-bye',
            ],
            list:[],
        },
        created: function () {
            this.selfF = 'white';
            this.selfB = 'black';

            this.flg = true;
        },
        computed: {
            wTax: {
                get: function () {
                    return parseInt(this.woTax * 1.08);
                },
                set: function (val) {
                    this.woTax = Math.ceil(val / 1.08);
                }
            },
            result: function () {
                var total = 0;
                for (var i = 0; i <= this.number; i++) {
                    total += 1;
                }
                return total;
            }
        },
        methods:{
            change: function () {
                this.isA = !this.isA;
                this.isB = !this.isB;
            }
        },

    })
}
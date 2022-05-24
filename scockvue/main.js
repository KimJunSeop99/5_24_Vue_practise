const app = Vue.createApp({
    data(){
        return{
            cart: [],
            prem: true // 자식 컴포넌트로 데이터 전달용
        }
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }

})
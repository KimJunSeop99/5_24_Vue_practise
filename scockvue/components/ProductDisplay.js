app.component('product-display',{
    props: {
        premium : {
            type: Boolean,
            required: true
        }
    },
    template:
    `
        <div class="product-display">
            <div class="product-container">
                <div class="product-image">
<!--                    이미지 들어가는 곳 -->
                    <img :src="image">
                </div>

                <div class="product-info">
<!--                    computed 메소드 호출 -->
                    <h1>{{ title }}</h1>
<!--                    Vue if문 쓰기-->
                    <p v-if="onSale"> {{ saleMessage }}</p>

                    <p v-if="inStock">In Stock</p>
                    <p v-else>Out of Stock</p>

                    <p>Shipping : {{ shipping }}</p>

<!--                    ul 반복문 -->
                    <ul>
                        <li v-for="detail in details">
                            {{ detail }}
                        </li>
                    </ul>
<!--                        객체 배열 반복문 예제 -->
                    <ul>
                        <li v-for="(variant, index) in variants"
                            :key="variant.id"
                            @mouseover="updateImage(index)"
                            class="color-circle"
                            :style="{'background-color':variant.color}"
                        >
                        </li>
                    </ul>
<!--                    장바구니 추가 버튼 -->
                    <button class="button"
                            :class="{ disabledButton : !inStock }"
                            :disabled="!inStock"
                            @click="addToCart">
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            onSale: true,
            product : 'Scoks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            // inStock : false,
            details : ['50% cotton', '30% wool', '20% polyester'],
            variants : [
                {id : 2234, color : 'green', images:'./assets/images/socks_green.jpg', quantity: 50},
                {id : 2235, color : 'blue', images:'./assets/images/socks_blue.jpg', quantity: 0},
            ]
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        updateImage(index) {
            // 이미지 경로 대신 숫자로 처리
            this.selectedVariant = index
        }
    },
    computed:{
        shipping(){
          if (this.premium) {
              return 'Free'
          }
          return 2.99
        },
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            // [0] : shock_green.jpg
            // [1] : shock_blue.jpg
            return this.variants[this.selectedVariant].images
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        saleMessage() {
            return this.brand + ' ' + this.product + 'is on sale'
        }
    }
})
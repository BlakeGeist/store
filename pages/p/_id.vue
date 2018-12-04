<template>
  <div class="product">
    <div class="product-image">
      <div class="product-image-img">
        <img v-bind:src="product.image_file" width="450px;"/>
      </div>
    </div>
    <div class="product-details-wrapper">
      <div class="product-details">
        <h1>
          <div v-if="this.$route.query.editPage">
            <textarea @input="updateTextArea" ref="textarea2" v-model="product.item_name" type="text" />
          </div>
          <div v-else>{{product.item_name}}</div>
        </h1>
        <div class="product-description">
          <div class="product-description-text" v-if="this.$route.query.editPage">
            <textarea @input="updateTextArea" ref="textarea" v-model="product.description" type="text" />
          </div>
          <div class="product-description-text" v-else v-html="product.description"></div>
        </div>
        <p class="product-brand"><strong>Brand - </strong> {{product.brand_name}}</p>
        <hr />
        <div class="product-price">
          <div v-if="this.$route.query.editPage">
            <strong>Original Price - </strong>
            <input v-model="product.msrp" type="text" />
          </div>
          <div v-else class="product-msrp">
            <strong>Original Price - </strong>
            <span class="strike">${{product.msrp}}</span>
          </div>
          <div v-if="this.$route.query.editPage">
            <strong>Sale Price - </strong>
            <input v-model="product.price" type="text" />
          </div>
          <div v-else class="product-sale-price">
            <strong>Sale Price - </strong>
            <span class="">${{product.price}}</span>
          </div>
          <div class="product-price">
            Quantity x
            <input @input="updateQuantity" v-model="quantity" min="1" class="" type="number" value="1" />
          </div>
          <button @click="checkout">Checkout</button>
        </div>
        <!--
        <div class="checkout-addresses">
          <div class="checkout-addressess-address">
            <div class="checkout-addressess-address-item mod-street">
              <input class="checkout-addressess-address-input" placeholder="Street: '1423 Main St.'" v-model="billing.street"/>
            </div>
            <div class="checkout-addressess-address-item mod-city">
              <input class="checkout-addressess-address-input" placeholder="City: 'Portland'" v-model="billing.city" />
            </div>
            <div class="checkout-addressess-address-item mod-state">
              <input class="checkout-addressess-address-input" placeholder="State: 'OR'" v-model="billing.stage" />
            </div>
            <div class="checkout-addressess-address-item mod-zip">
              <input class="checkout-addressess-address-input" placeholder="Zip: '98632'" v-model="billing.zip" />
            </div>
          </div>
        </div>
        -->
      </div>
    </div>
    <div v-if="this.$route.query.editPage" class="update-product"><button @click="updateProduct(product)">Update</button></div>
    <vue-stripe-checkout
        ref="checkoutRef"
        :image="image"
        :name="name"
        :description="description"
        :currency="currency"
        :amount="parseInt(amount)"
        :allow-remember-me="false"
        @done="done"
        @opened="opened"
        @closed="closed"
      >
    </vue-stripe-checkout>
    <div class="footer">
      <router-link to="/privacy-policy" target="_blank">Privacy</router-link> |
      <router-link to="/terms" target="_blank">Terms</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import firebase from '@/services/fireinit'
const db = firebase.firestore()
export default {
  name: 'ProductPage',
  head () {
    return {
      title: this.product.item_name
    }
  },
  data: function () {
    return {
      product: {},
      image: '',
      name: 'Checkout',
      description: '',
      currency: 'USD',
      amount: '',
      msrp: '',
      quantity: 1,
      billing: {
        street: '',
        city: '',
        state: '',
        zip: ''
      },
      shipping: {
        street: '',
        city: '',
        state: '',
        zip: ''
      }
    }
  },
  /**mounted () {
    var urlParams = this.$route.params
    var productRef = db.collection('products').doc(urlParams.id)

    productRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!')
        } else {
          this.product = doc.data()
          this.amount = this.product.price
          this.msrp = this.product.msrp
        }
      })
      .catch(err => {
        console.log('Error getting document', err)
      })
  }, **/
  methods: {
    async checkout () {
      const token = await this.$refs.checkoutRef.open()
    },
    done (token) {
      // do stuff
    },
    opened () {
      // do stuff
    },
    closed () {
      // do stuff
    },
    updateProduct: function (product) {
      console.log(product)
      db.collection('products').doc(product.item_id).set(product)
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    updateQuantity () {
      this.product.msrp = (this.quantity * this.product.orgMsrp)
      this.product.msrp = Math.round(100 * this.product.msrp) / 100
      this.product.price = this.quantity * this.product.orgPrice
      this.product.price = Math.round(100 * this.product.price) / 100
    },
    updateTextArea () {
      this.$refs.textarea.style.minHeight = this.$refs.textarea.scrollHeight + 'px'
      this.$refs.textarea2.style.minHeight = this.$refs.textarea2.scrollHeight + 'px'
    }
  },
  async asyncData({app, params, error}) {
    const ref = db.collection("products").doc(params.id)
    let snap
    let thisProduct = {}
    try {
      snap = await ref.get()
      thisProduct = snap.data()
      thisProduct.orgMsrp =  thisProduct.msrp
      thisProduct.orgPrice =  thisProduct.price
    } catch (e) {
      // TODO: error handling
      console.error(e)
    }
    return {
      product: thisProduct
    }
  },
  mounted () {
    if(this.$refs.textarea) {
      this.$refs.textarea.style.minHeight = this.$refs.textarea.scrollHeight + 'px'
      this.$refs.textarea2.style.minHeight = this.$refs.textarea2.scrollHeight + 'px'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0
}
p{
  margin-top: 1em;
  margin-bottom: 1em;
}
html, body, #__nuxt, #__layout, .default,  .product{
  height: 100%;
}
.product {
  justify-content: center;
  display: flex;
  max-width: 1150px;
  margin: 0 auto;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 24px;
  &-price{
    input {
      border: 1px solid;
      padding: 0 .3em;
      text-align: center;
      width: 50px;
    }
  }
}
  .product-details{
    width: 100%;
    textarea {
      width: 100%;
      font-size: inherit;
      color: inherit;
      font-family: inherit;
      font-weight: inherit;
      height: initial;
      resize: none;
      background-color: transparent;
      border: none;
    }
    h1{
      font-size: 1.9rem;
      margin: 15px 0 20px;
    }
    hr{
      width: 50%;
      margin: .5rem 0px;
    }
    p{

    }
  }
  .product-description-text{
    margin: 10px 0;
  }
  .product-image, .product-details-wrapper{
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .product-details-wrapper{
    flex: 0 1 535px;
  }
  .product-image{
    flex: 0 1 535px;
    img{
      width: 100%;
    }
  }
  .product-price{
    .strike{
      text-decoration: line-through;
    }
    button{
      display: flex;
      width: 150px;
      height: 50px;
      border-radius: 5px;
      justify-content: center;
      font-size: 24px;
      margin-top: 20px;
      &:hover{
        cursor: pointer;
        background-color: #f1f1f1;
        box-shadow: 3px 3px 11px -1px rgba(0, 0, 0, 0.48);
      }
    }
  }
  .product-sale-price{
    color: #f30000;
  }
  .footer {
    flex: 1 1 100%;
    text-align: center;
    color: #ccc;
    margin-top: 25px;
    padding: 15px;
    a {
      color: #ccc;
      text-decoration: none;
      &:hover{
        text-decoration: underline;
      }
    }
  }
  .update-product{
    position: absolute;
    top: 0;
    text-align: center;
  }
</style>

<template>
  <div class="products">
    <div v-for="(product) in products" v-bind:key="product.id" class="products-product">
      <h3 class="products-product-name">
        <router-link :to="{path: '/p/' + product.item_id}" >{{product.item_name}}</router-link> - {{product.item_id}}</h3>
      <div class="products-product-image">
        <img v-bind:src="product.image_file" width="75px" />
        <AdditionalImages v-bind:images="product.additional_images" />
      </div>
      <div class="products-product-text">
        <p>{{product.description}}</p>
      </div>
      <div class="products-product-price">
        <table>
            <tr>
              <th>Price</th>
              <th>MSRP</th>
              <th>Shipping</th>
              <th>Pretty Price</th>
              <th>Profit</th>
            </tr>
            <tr>
              <td>{{product.price}}</td>
              <td>{{product.msrp}}</td>
              <td>{{product.ship_cost}}</td>
              <td><PrettyPrice v-bind:price="product.msrp" /></td>
              <td><Profit v-bind:msrp="product.msrp" v-bind:price="product.price" /></td>
            </tr>
        </table>
      </div>
      <div class="product-product-delete">
        <select>
          <option v-for="site in sites" v-bind:value="site.address">{{site.address}}</option>
        </select>
        <button @click="addToSite(product)">Add</button>
        <button @click='deleteProduct(product)'>Delete</button>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>

import PrettyPrice from '@/components/dashboard/PrettyPrice'
import Profit from '@/components/dashboard/Profit'
import AdditionalImages from '@/components/dashboard/AdditionalImages'
import firebase from 'firebase'

const db = firebase.firestore()

export default {
  data: function () {
    return {
      images: [],
      sites: [],
      siteSlug: ''
    }
  },
  components: {
    PrettyPrice,
    AdditionalImages,
    Profit
  },
  name: 'Products',
  props: {
    products: Array
  },
  methods: {
    addToSite () {

    },
    deleteProduct: function (product) {
      db.collection('products').doc(product.item_id).delete()
        .then(function () {
          console.log('Document successfully deleted!')
        }).catch(function (error) {
          console.error('Error removing document: ', error)
        })
    }
  },
  beforeCreated () {
    var query = db.collection('sites')

    query.onSnapshot(querySnapshot => {
      this.sites = []
      querySnapshot.forEach((doc) => {
        this.sites.push(doc.data())
      })
    }, err => {
      console.log(`Encountered error: ${err}`)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>

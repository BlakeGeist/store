<template>
  <div class="dashboard">
    <div id="app">
      <router-link to="/dashboard-sites"></router-link>
      <div class="container">
        <div class="panel panel-sm">
          <div class="panel-heading">
            <h4>CSV Import</h4>
          </div>
          <div class="panel-body">
            <div class="form-group">
              <label for="csv_file" class="control-label col-sm-3 text-right">CSV file to import</label>
              <div class="col-sm-9">
                <input type="file" id="csv_file" name="csv_file" class="form-control" @change="uploadFromCSV($event)">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Products v-bind:products="products" />
  </div>
</template>
<script>

import firebase from '@/services/fireinit'
import Products from '@/components/dashboard/Products'
import Papa from 'papaparse'
import _ from 'lodash'

const db = firebase.firestore()

export default {
  name: 'dashboard',
  data: function () {
    return {
      channel_name: '',
      channel_fields: [],
      channel_entries: [],
      parse_header: [],
      parse_csv: [],
      sortOrders: {},
      sortKey: '',
      products: []
    }
  },
  components: {
    Products
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    uploadFromCSV: function (e) {
      const fileToLoad = event.target.files[0]
      const reader = new FileReader()
      reader.onload = fileLoadedEvent => {
        Papa.parse(fileLoadedEvent.target.result, {
          header: true,
          complete (results) {
            _.each(results.data, function (result) {
              if (result.product_id) {
                const timeStamp = new Date()
                result.dateCreated = timeStamp
                result.dateLastUpdated = timeStamp
                db.collection('products').doc(result.item_id).set(result)
                  .then(function () {
                    console.log(result)
                    console.log('Document successfully written!')
                  })
                  .catch(function (error) {
                    console.error('Error writing document: ', error)
                  })
              }
            })
          },
          error (errors) {
            console.log('error', errors)
          }
        })
      }
      reader.readAsText(fileToLoad)
    }
  },
  async asyncData({app, params, error}) {
    const ref = db.collection("products").orderBy('dateCreated', 'asc')
    let snap
    let products = []
    try {
      snap = await ref.get()
      snap.docs.forEach((doc) => {
        products.push(doc.data())
      })
    } catch (e) {
      // TODO: error handling
      console.error(e)
    }
    return {
      products: products
    }
  }
}

</script>
<style scoped>
html, body {
  margin: 0;
  padding: 0;
}
body {
  margin: 32px auto;
}
.panel {
  border: 2px solid #dfdfdf;
  box-shadow: rgba(0, 0, 0, 0.15) 0 1px 0 0;
  margin: 10px;
}
.panel.panel-sm {
  margin: 10px auto;
}
.panel-heading {
  border-bottom: 2px solid #dfdfdf;
}
.panel-heading h1, .panel-heading h2, .panel-heading h3, .panel-heading h4, .panel-heading h5, .panel-heading h6 {
  margin: 0;
  padding: 0;
}
.panel-body{
  overflow: scroll;
}
.panel-body .checkbox-inline {
  padding: 15px 20px;
}
</style>

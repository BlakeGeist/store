<template>
  <span class="products-product-images">
    <img v-for="image in imagesArray" v-bind:src="image" width="75px" />
  </span>
</template>

<script>
export default {
  data: function () {
    return {
      imagesArray: this.images.split('|')
    }
  },
  name: 'AdditionalImages',
  props: {
    images: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>

<template>
  <div class="price">
    {{prettyPrice}}
  </div>
</template>

<script>
export default {
  name: 'PrettyPrice',
  props: {
    price: String
  },
  created () {
    this.prettyPrice = (Math.ceil(this.price / 10) * 10) - .01;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>

<template>
  <div class="price">
    {{prettyPrice}}
  </div>
</template>

<script>
export default {
  name: 'Profit',
  props: {
    price: String,
    msrp: String
  },
  created () {
    this.prettyPrice = ((Math.ceil(this.msrp / 10) * 10) - .01) - this.price;
    this.prettyPrice = Math.round(100*this.prettyPrice)/100;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>

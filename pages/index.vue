<template>
  <section class="container">
    <div>
      <nuxt-link to="/privacy">Privacy</nuxt-link> |
      <nuxt-link to="/terms">Terms</nuxt-link>
    </div>
  </section>
</template>

<script>

export default {
  components: {
  }
}
</script>

<style>
#__nuxt {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<template>
  <v-app>
    <nav>
      <router-link to="/">Currency</router-link> |
      <router-link to="/converter">Converter</router-link>
    </nav>
    <router-view />
  </v-app>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getCurrencies")
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

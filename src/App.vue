<template>
  <div id="app">
    <the-navbar></the-navbar>
    <router-view/>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'

export default {
  components: {
    TheNavbar
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

body {
  background: #f0f0f0;
  min-height: 100vh;
}
</style>

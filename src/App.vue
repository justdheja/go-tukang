<template>
  <div id="app">
    <log-in v-if="!isLoggedin"></log-in>
    <div v-else>
      <the-navbar></the-navbar>
      <router-view/>
    </div>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'
import LogIn from './components/LogIn'

export default {
  components: {
    TheNavbar,
    LogIn
  },

  computed: {
    isLoggedin() {
      return this.$store.state.isLogin
    }
  },

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

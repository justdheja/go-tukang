<template>
  <div class="login">
    <div class="card">
      <div class="card-content">
        <img width="100" src="@/assets/logo_only.png" alt="">
        <b-field label="Username">
            <b-input v-model="username"></b-input>
        </b-field>
        <b-field label="Password">
            <b-input type="password"
                v-model="password"
                :value="password"
                password-reveal>
            </b-input>
        </b-field>
        <button class="button is-success" @click.prevent="logIn">Log In</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    logIn() {
      this.$store.commit('loginUser', {
        username: this.username
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

img {
  display: block;
  margin: 20px auto;
}

button {
  display: block;
  margin: auto;
}
</style>
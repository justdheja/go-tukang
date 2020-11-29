<template>
  <div class="my-6 py-5">
    <div class="header">
      <h1 class="subtitle">Services</h1> <button class="mx-3 button is-success">+ Add Service</button>
    </div>
    <the-loader v-if="isLoading"></the-loader>
    <div v-else-if="services.length > 0" class="card-container">
      <div v-for="(item, i) in services" :key="i" class="card">
        <div class="card-content">
          {{item.specialization}}
        </div>
      </div>
    </div>
    <h1 class="subtitle has-text-centered" v-else>
      You don't have any service
    </h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      services: null,
      isLoading: false
    }
  },

  created() {
    this.getUser()
  },

  computed: {
    username() {
      return this.$store.state.username
    }
  },

  methods: {
    getUser() {
      this.isLoading = true
      let data = JSON.parse(`
        {
          "username": "Jono"
        }
      `)

      let config = {
        method: 'get',
        url: 'https://go-tukang.herokuapp.com/tukang/list',
      }

      this.$http(config)
        .then((response) => {
          console.log(response.data)
          let array = response.data.list

          this.services = array.filter(item => item.username === this.username)
          console.log(this.services)
          this.isLoading = false
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-content: center;

  button {
    border-radius: 25px;
  }
}
.card {
  display: inline-block;
  margin: 0 20px 20px 0;
  width: 25px;
}
</style>
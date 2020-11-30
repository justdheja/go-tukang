<template>
  <div class="my-6 py-5">
    <h1 class="subtitle">Received Order</h1>
    <div v-for="item in orders" :key="item.username" class="card mb-3">
      <div class="card-content">
        <div class="heading">Order by: {{ item.usernameUs }}</div>
        <div class="subheading"><i class="fas fa-map-marker-alt"></i> {{ item.location }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: []
    }
  },

  computed: {
    username() {
      return this.$store.state.username
    }
  },

  created() {
    this.getOrder()
  },
  
  methods: {
    async getOrder(){
      let data = JSON.parse(`
        {
          "usernameTk": "${this.username}"
        }
      `)
      let config = {
        method: 'post',
        url: 'https://go-tukang.herokuapp.com/order/find',
        data: data
      }

      await this.$http(config)
        .then((response) => {
          console.log(response.data)
          this.orders = response.data.orders
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
}
</script>
<template>
  <div class="my-6 py-5">
    <div class="header">
      <h1 class="subtitle">Services</h1> <add-service></add-service>
    </div>
    <the-loader v-if="isLoading"></the-loader>
    <div v-else-if="services.length > 0" class="card-container">
      <div v-for="(item, i) in services" :key="i" class="card">
        <div class="card-content">
          {{item.specialization}} <br>
          <button v-if="showRestButton" class="button is-success" @click="toggleStatus">Set to Rest Mode</button>
          <button v-else class="button is-success" @click="toggleStatus">Set Back to On</button>
        </div>
      </div>
    </div>
    <h1 class="subtitle has-text-centered" v-else>
      You don't have any service
    </h1>
  </div>
</template>

<script>
import EventBus from '@/eventBus'
import AddService from './AddService'

export default {
  data() {
    return {
      services: null,
      isLoading: false,
      showModal: false,
      showRestButton: true
    }
  },

  components: {
    AddService
  },

  created() {
    this.getUser()
    EventBus.$on('tukang-add-service', () => {
      this.getUser()
    })
  },

  computed: {
    username() {
      return this.$store.state.username
    }
  },

  methods: {
    getUser() {
      this.isLoading = true

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
          if(this.services.length > 0) {
            EventBus.$emit('service-available')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },

    toggleStatus() {
      this.isLoading = true
      let data = JSON.parse(`
      {
        "usernameTk": "${this.username}",
        "status": "Tukang Sedang Istirahat"
      }
      `)
      let data2 = JSON.parse(`
      {
        "usernameTk": "${this.username}",
        "status": "Tukang On"
      }
      `)

      let config = {
        method: 'post',
        url: 'https://backend-pubsub-gotukang.herokuapp.com/publish/status',
        data: this.showRestButton? data : data2
      }

      this.$http(config)
        .then((response) => {
          console.log(response.data)
          this.showRestButton = false
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
  width: 255px;
}
</style>
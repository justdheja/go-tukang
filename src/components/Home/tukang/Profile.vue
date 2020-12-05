<template>
  <div>
    <div class="columns">
      <div class="column has-text-centered is-one-fifth">
        <i class="fas fa-user-circle"></i>
      </div>
      <div class="column">
        <div>
          <h2 class="subtitle">
            <strong>
              {{username}}
            </strong>
          </h2>
          Handyman
          <br>
          <!-- <button v-if="serviceAvailable" class="button is-success">Set Status</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '@/eventBus'

export default {
  data() {
    return {
      serviceAvailable: ''
    }
  },
  created() {
    EventBus.$on('service-available', () => {
      this.serviceAvailable = true
    })
  },
  computed: {
    username() {
      return this.$store.state.username
    }
  },
}
</script>

<style lang="scss" scoped>
.fa-user-circle {
  text-align: center;
  font-size: 100px;
}
</style>
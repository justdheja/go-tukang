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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
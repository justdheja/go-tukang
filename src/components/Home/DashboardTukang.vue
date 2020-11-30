<template>
  <div>
    <div class="container">
      <h1 class="title">Dashboard</h1>
      <the-profile></the-profile>
      <div class="columns">
        <div class="column">
          <the-service></the-service>
        </div>
        <div class="column">
          <the-order></the-order>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheProfile from './tukang/Profile'
import TheService from './tukang/Services'
import TheOrder from './tukang/Order'

export default {
  components: {
    TheProfile,
    TheService,
    TheOrder
  },
}
</script>
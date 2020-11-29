<template>
  <div>
    <div class="container">
      <h1 class="title">Dashboard</h1>
      <the-profile></the-profile>
      <the-service></the-service>
    </div>
  </div>
</template>

<script>
import TheProfile from './tukang/Profile'
import TheService from './tukang/Services'

export default {
  components: {
    TheProfile,
    TheService
  },
}
</script>
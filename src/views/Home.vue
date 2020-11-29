<template>
  <div class="home">
    <div v-if="isTukang" class="tukang">
      <dashboard-tukang></dashboard-tukang>
    </div>
    <div v-else class="user">
      <list-tukang></list-tukang>
    </div>
  </div>
</template>

<script>
import ListTukang from '../components/Home/ListTukang'
import DashboardTukang from '../components/Home/DashboardTukang'

export default {
  name: 'Home',
  components: {
    ListTukang,
    DashboardTukang
  },

  computed: {
    isTukang() {
      return this.$store.state.isTukang
    }
  }
}
</script>

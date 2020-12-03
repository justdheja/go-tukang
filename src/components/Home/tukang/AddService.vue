<template>
  <div>
    <button class="mx-3 button is-success" @click="showModal = !showModal">+ Add Service</button>
    <b-modal 
        v-model="showModal"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal>
        <template>
          <form action="">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Add Service</p>
                        <button
                            type="button"
                            class="delete"
                            @click="showModal = !showModal"/>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Service">
                            <b-input v-model="inputservice"></b-input>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="showModal = !showModal">Close</button>
                        <button class="button is-success" @click.prevent="addService">Add Service</button>
                    </footer>
                </div>
            </form>
        </template>
    </b-modal>
  </div>
</template>

<script>
import EventBus from '@/eventBus'

export default {
  data() {
    return {
      showModal: false,
      inputservice: ''
    }
  },

  computed: {
    username() {
      return this.$store.state.username
    }
  },

  methods: {
    addService() {
      let data = JSON.parse(`
        {
          "username": "${this.username}",
          "specialization": "${this.inputservice}",
          "location": "Yogyakarta"
        }
      `)

      let config = {
        method: 'post',
        url: 'https://go-tukang.herokuapp.com/tukang/add',
        data: data
      }

      this.$http(config)
        .then((response) => {
          console.log(response.data)

          this.showModal = false
          this.inputservice = ''
          EventBus.$emit('tukang-add-service')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
}
</script>
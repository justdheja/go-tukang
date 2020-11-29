<template>
  <div class="order-modal">
    <b-modal 
        v-model="showOrderModal"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal>
        <template>
          <form action="">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Login</p>
                        <button
                            type="button"
                            class="delete"
                            @click="$emit('close')"/>
                    </header>
                    <section class="modal-card-body">
                        <b-checkbox>Remember me</b-checkbox>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="showOrderModal = false">Close</button>
                        <button class="button is-primary">Login</button>
                    </footer>
                </div>
            </form>
        </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    showOrderModal: Boolean
  }
}
</script>
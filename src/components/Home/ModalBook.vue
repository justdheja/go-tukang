<template>
	<div class="modal-book">
		<section>
			<b-modal
				v-model="showModal"
				has-modal-card
				full-screen
				:can-cancel="false"
			>
				<div class="modal-card" style="width: auto">
					<header class="modal-card-head">
						<a class="" type="button" @click="close">Back</a>
					</header>
					<section class="modal-card-body px-4">
						<div class="container">
							<div class="columns">
								<div class="column is-one-fifth flex-center">
									<i class="fas fa-user-circle"></i>
								</div>
								<div class="column">
									<div class="title">Username</div>
									<div class="subtitle">Handyman</div>
									<i v-for="x in 5" :key="x" class="fas fa-star my-3"></i>
								</div>
								<div class="column is-one-fifth">
									<button class="button subtitle">Book Now</button>
								</div>
							</div>
							<div class="columns mt-6">
                <div class="column">
                  <h1 class="subtitle">Services</h1>
                  <div class="card-container">
                    <div v-for="i in 7" :key="i" class="card mr-5">
                      <div class="card-content">
                        <p>Hello</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column is-one-third review">
                  <h1 class="subtitle">Reviews</h1>
                  <div v-for="i in 8" :key="i" class="card my-2">
                    <div class="card-content">
                      <div class="columns">
                        <div class="column is-one-fifth">
                          <i class="fas fa-user-circle"></i>
                        </div>
                        <div class="column">
                          Ignas <br>
                          <i v-for="x in 5" :key="x" class="fas fa-star my-3"></i>
                        </div>
                      </div>
                      <p class="content">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi aliquid natus voluptate inventore incidunt cupiditate voluptates nihil distinctio quasi ullam alias accusamus, aut laborum officiis libero voluptatum fugit numquam autem?
                      </p>
                    </div>
                  </div>
                </div>
							</div>
						</div>
					</section>
					<!-- <footer class="modal-card-foot">
                </footer> -->
				</div>
			</b-modal>
		</section>
    <order-modal :show-order-modal="showOrderModal"></order-modal>
	</div>
</template>

<script>
import EventBus from '@/eventBus';
import OrderModal from './OrderModal'

export default {
	props: {
		showModal: Boolean,
  },
  components: {
    OrderModal
  },
  data() {
    return {
      showOrderModal: true
    }
  },
	methods: {
		close() {
			EventBus.$emit('close-book-modal');
		},
	},
};
</script>

<style lang="scss" scoped>
.modal-book {
}
.fa-user-circle {
	font-size: 120px;
}
.review .is-one-fifth {
  .fa-user-circle {
    font-size: 50px;
  }
}
.fa-star {
	color: gold;
}
.flex-center {
	display: flex;
	justify-content: center;
}
.card-container {
  .card {
    display: inline-block;
    
  }
}
</style>

<template>
	<div class="list-tukang">
		<div class="container">
			<div class="columns">
				<div class="column is-one-fifth">
					<h1 class="title">Filter</h1>
					<div class="card">
						<div class="card-content">
							<b-radio v-model="radio" name="name" native-value="Flint">
								Rating
							</b-radio> <br>
							<b-radio v-model="radio" name="name" native-value="Flint">
								Location
							</b-radio> <br>
							<b-radio v-model="radio" name="name" native-value="Flint">
								Service Types
							</b-radio>
						</div>
					</div>
				</div>
				<div class="column">
					<h1 class="title">Handyman</h1>
					<div class="card-container">
						<div @click="openBook()" v-for="i in 5" :key="i" class="card">
							<div class="card-content">
								<i class="fas fa-user-circle my-3"></i> <br />
								Username <br />
								<i v-for="x in 5" :key="x" class="fas fa-star my-3"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    <modal-book :show-modal="showModal"></modal-book>
	</div>
</template>

<script>
import ModalBook from './ModalBook'
import EventBus from '@/eventBus'

export default {
  components: {
    ModalBook
  },
  data() {
    return {
      showModal: false,
      radio: ''
    }
  },
  created() {
    EventBus.$on('close-book-modal', () => {
      this.showModal = false
    })
  },
  methods: {
    openBook() {
      this.showModal = !this.showModal
    }
  },
}
</script>

<style lang="scss" scoped>
.list-tukang {
}

.card-container {
	.card {
    cursor: pointer;
		display: inline-block;
		text-align: center;
		margin: 0 20px 20px 0;
		width: 200px;
		.fa-user-circle {
			font-size: 100px;
		}
		.fa-star {
			color: gold;
		}
	}
}
</style>

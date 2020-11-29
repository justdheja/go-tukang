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
					<the-loader v-if="isLoading"></the-loader>
					<div v-else class="card-container">
						<div @click="openBook(tukang)" v-for="(tukang, index) in listTukang" :key="index" class="card">
							<div class="card-content">
								<i class="fas fa-user-circle my-3"></i> <br />
								{{ tukang.username }} <br />
								{{ tukang.review }} <i class="fas fa-star my-3"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    <modal-book :show-modal="showModal" :data="selectedTukang"></modal-book>
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
      listTukang: [],
			selectedTukang: null,
			isLoading: false,
      radio: ''
    }
  },
  created() {
    EventBus.$on('close-book-modal', () => {
      this.showModal = false
    })
    this.getTukangList()
  },
  methods: {
    openBook(item) {
      this.showModal = !this.showModal
      this.selectedTukang = item
    },
    async getTukangList() {
			this.isLoading = true
      await this.$http.get('https://go-tukang.herokuapp.com/tukang/list')
        .then((response) => {
          console.log(response.data)
					this.listTukang = response.data.list
					this.isLoading = false
        })
        .catch((err) => {
          console.log(err)
        })
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

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
									<div class="title">{{data.username}}</div>
									<div class="subtitle">Handyman</div>
									<p>
										<i class="fas fa-map-marker-alt"></i> {{ data.location }}
									</p>
									<i v-for="x in 5" :key="x" class="fas fa-star my-3"></i>
								</div>
							</div>
							<b-collapse
								aria-id="contentIdForA11y2"
								class="panel"
								animation="slide"
								v-model="isOpen"
							>
								<div
									slot="trigger"
									class="panel-heading has-text-centered"
									role="button"
									aria-controls="contentIdForA11y2"
								>
									<strong>Book Now</strong>
								</div>

								<div class="panel-block">									
                  <b-field label="address">
										<b-select placeholder="Select Province" v-model="provinsi">
											<option
												v-for="option in province"
												:value="option"
												:key="option.id"
											>
												{{ option.nama }}
											</option>
										</b-select>
										<b-select
											placeholder="Select City"
											v-model="kota"
										>
											<option
												v-for="option in city"
												:value="option"
												:key="option.id"
											>
												{{ option.nama }}
											</option>
										</b-select> <br>
									</b-field>
									<b-field label="">
										<b-input v-model="detailAlamat"></b-input>
									</b-field>
									<b-field label="Select a date">
											<b-datepicker
													placeholder="Click to select..."
													:min-date="minDate">
											</b-datepicker>
									</b-field>
									<button class="button is-success" @click.prevent="addOrder">Book {{ data.username }}</button>
								</div>
							</b-collapse>


							<div class="columns mt-6">
								<div class="column">
									<h1 class="subtitle">Services</h1>
									<div class="card-container">
										<div  class="card mr-5">
											<div class="card-content">
												<p>{{data.specialization}}</p>
											</div>
										</div>
									</div>
								</div>

								<div class="column is-one-third review">
									<h1 class="subtitle">Reviews</h1>
									<the-loader v-if="isLoadReview"></the-loader>
									<div v-for="item in reviews" :key="item.star" class="card my-2">
										<div class="card-content">
											<div class="columns">
												<div class="column is-one-fifth">
													<i class="fas fa-user-circle"></i>
												</div>
												<div class="column">
													{{item.usernameUs}} <br />
													<i
														v-for="x in item.star"
														:key="x"
														class="fas fa-star my-3"
													></i>
												</div>
											</div>
											<p v-if="item.comment.length > 0" class="content">
												{{ item.comment }}
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
	</div>
</template>

<script>
import EventBus from '@/eventBus';
import Axios from 'axios'
import FormData from 'form-data'

export default {
	props: {
    showModal: Boolean,
    data: Object
  },
  
	data() {
		const today = new Date()
		return {
			showOrderModal: false,
			isOpen: false,
      showSelectKota: false,
      provinsi: null,
			kota: null,
			detailAlamat: '',
      serviceType: [],
			province: [],
			reviews: [],
			city: [],
			isLoadReview: false,
			date: new Date(),
			minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
		};
	},
	
	computed: {
		username() {
			return this.$store.state.username
		}
	},
  
	methods: {
		close() {
			EventBus.$emit('close-book-modal');
		},
		order() {
			this.showOrderModal = !this.showOrderModal;
    },
    async getCityList(newProvinsi) {
      let responseData = []
      await Axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${newProvinsi.id}`)
        .then((response) => {
          responseData = response.data.kota_kabupaten
          this.city = responseData
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getTukangReviews() {
			this.isLoadReview = true
      let data = JSON.parse(`
        {
          "usernameTk": "${this.data.username}"
        }
			`)
			// let dataBody = new FormData()
			// dataBody.append("usernameTk", "Panjulina")
      let config = {
        method: 'post',
        url: 'https://go-tukang.herokuapp.com/review/find',
        data : data
      }
      await this.$http(config)
        .then((response) => {
					console.log(response)
					this.reviews = response.data.reviews
					this.isLoadReview = false
        })
        .catch((err) => {
          console.log(err)
        })
		},
		
		async addOrder() {
			let data = JSON.parse(`
				{
					"usernameUs": "${this.username}",
					"usernameTk": "${this.data.username}",
					"location": "${this.detailAlamat + ', ' + this.kota.nama + ', ' + this.provinsi.nama}"
				}
			`)

			let config = {
				method: 'post',
        url: 'https://go-tukang.herokuapp.com/order/add',
        data : data
			}

			await this.$http(config)
        .then((response) => {
					console.log(response.data)
					this.$buefy.toast.open({
							message: 'Order Success',
							type: 'is-success'
					})
					this.close()
        })
        .catch((err) => {
          console.log(err)
        })
		}
	},

	watch: {
    provinsi(newProvinsi, oldProvinsi) {
      this.getCityList(newProvinsi)
    }
  },

	async created() {
		await this.$http
			.get('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
			.then((response) => {
				this.province = response.data.provinsi;
			})
			.catch((err) => {
				console.log(err);
      });
			
		this.getTukangReviews()
	},
};
</script>

<style lang="scss" scoped>
.fa-user-circle {
	font-size: 120px;
}
.review .is-one-fifth {
	.fa-user-circle {
		font-size: 50px;
	}
}
.collapse {
	display: block;
	width: 60%;
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
.panel-block {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
}
.checkbox  {
  display: inline;
}
</style>

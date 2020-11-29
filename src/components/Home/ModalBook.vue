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
                  {{ data }}
									<div class="title">{{data.username}}</div>
									<div class="subtitle">Handyman</div>
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
									<b-field label="Service">
										<div class="field">
											<b-checkbox v-model="serviceType" native-value="Silver">
												Silver
											</b-checkbox>
										</div>
                    <div class="field">
											<b-checkbox v-model="serviceType" native-value="Flint">
												Flint
											</b-checkbox>
                    </div>
									</b-field>
                  
                  <br>
									
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
										</b-select>
									</b-field>
								</div>
							</b-collapse>


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
													Ignas <br />
													<i
														v-for="x in 5"
														:key="x"
														class="fas fa-star my-3"
													></i>
												</div>
											</div>
											<p class="content">
												Lorem ipsum dolor sit amet consectetur adipisicing elit.
												Modi aliquid natus voluptate inventore incidunt
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

export default {
	props: {
    showModal: Boolean,
    data: Object
  },
  
	data() {
		return {
			showOrderModal: false,
			isOpen: false,
      showSelectKota: false,
      provinsi: null,
      kota: null,
      serviceType: [],
      province: [],
      city: []
		};
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
      let data = JSON.parse(`
        {
          "usernameTk": "Panjulina"
        }
      `)
      console.log(data)
      let config = {
        method: 'get',
        url: 'https://go-tukang.herokuapp.com/review/find',
        data : data
      }
      await Axios(config)
        .then((res) => {
          console.log(res)
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
			.get('http://dev.farizdotid.com/api/daerahindonesia/provinsi')
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
.checkbox  {
  display: inline;
}
</style>

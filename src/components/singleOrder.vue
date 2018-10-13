<template>
    <div class="container-flex order">
      <div class="row">
        <div class="col-sm-12 col-md-8 ls-order-info">
          <p><a>client :</a> {{ name }}</p>
          <p><a>adresse de livraison : </a> {{ adresse }}</p>
          <b-row class="img-row">
            <b-col-1 v-for="(img, key) in images" :key="key">
              <b-img thumbnail v-bind:src="img" fluid height=75 @click="modalShow = !modalShow"/>
              <b-modal centered hide-header hide-footer v-model="modalShow">
                <image-modal v-bind:src="img"></image-modal>
              </b-modal>
            </b-col-1>
          </b-row>
          <div v-if="tracking_number === null">
            <input type="text"
            class="form-control col-sm-8"
            placeholder="numéro de suivi"
            v-model="text_input"/>
            <b-button v-on:click.prevent="checkTrackingNumber" class="btn-submit col-sm-1">
              <font-awesome-icon icon="upload"/>
            </b-button>
            <b-button v-b-modal.modal1 class="btn-alert col-sm-1">
              <font-awesome-icon icon="exclamation"/>
            </b-button>
            <b-modal id="modal1" centered ok-only title="Un problème ?" ok-title="Envoyer">
              <problem-modal></problem-modal>
            </b-modal>
          </div>
          <div v-else>
            <p><a>numéro de suivi :</a> {{ tracking_number }}</p>
          </div>
        </div>
        <div class="col-sm-12 col-md-4 rs-order-info">
          <p><a>contact : </a> {{ phone }}</p>
          <p><a>numéro de commande :</a> {{ id }}</p>
          <p><a>commande enregistrée le :</a> {{ getDate }} à {{ getTime }}</p>
          <p><a>montant de la commande :</a> {{ formatAmount }}€</p>
        </div>
      </div>
    </div>
</template>

<script>
import ProblemModal from './ProblemModal';
import ImageModal from './ImageModal';
import Images from './Images';

export default {
  props: ['id', 'date', 'amount', 'name', 'phone', 'tracking_number', 'adresse', 'images'],
  components: {
    'problem-modal': ProblemModal,
    'order-images': Images,
    'image-modal': ImageModal,
  },
  data() {
    return {
      modalShow: false,
      text_input: '',
    };
  },
  methods: {
    getDeliveryCompany() {
      let c = null;
      if (this.text_input.length === 18 && this.text_input.slice(0, 2) === '1Z') {
        c = 'UPS';
      } else if (this.text_input.length === 13 && this.text_input[1].match(/[a-z]/i)) {
        c = 'La Poste';
      }
      return c;
    },
    checkTrackingNumber() {
      this.$http.get(`https://api.laposte.fr/suivi/v1/${this.text_input}`,
        { headers: { 'X-Okapi-Key': process.env.X_OKAPI_KEY },
        })
      // eslint-disable-next-line
      .then( (data) => { this.post(); })
      // eslint-disable-next-line
      .catch( (e) => { alert(e.body.message); });
    },
    post() {
      if (this.getDeliveryCompany() !== null) {
        this.$http.post('https://r0f3fxooni.execute-api.eu-west-1.amazonaws.com/dev/update/order',
          { order_id: this.id,
            tracking_number: this.text_input,
            delivery_service: this.getDeliveryCompany(),
          },
          { headers: { 'x-api-key': process.env.X_API_KEY } },
        )
        // eslint-disable-next-line
        .then( (data) => { console.log(data); });
      }
    },
    sendModal() {
      // alert("poisson d'avril");
    },
  },
  computed: {
    formatAmount() {
      return parseFloat(this.amount / 100).toFixed(2);
    },
    getDate() {
      return `${this.date.slice(8, 10)}/${this.date.slice(5, 7)}/${this.date.slice(0, 4)}`;
    },
    getTime() {
      return this.date.slice(11, 16);
    },
  },
};
</script>

<style scoped>
.img-row {
  padding-left: 15px;
}
.order {
  border: 2px solid #2193b0;
  border-radius: 10px;
  margin-bottom: 5px;
  overflow: auto;
}
a {
  font-weight: 700;
}
.btn-submit {
  background: #f8d764;
  border: white;
  color: black;
  font-weight: 600;
  margin-left: 4px;
}
.btn-alert {
  background: #d7574c;
  border: white;
  margin-left: 4px;
  color: white;
  font-weight: 600;
}
.img-fluid {
  height: 100px;
}
.rs-order-info {
  background: #2193b0;
  color: white;
  padding: 15px;
}
.ls-order-info {
  padding: 15px;
}
</style>

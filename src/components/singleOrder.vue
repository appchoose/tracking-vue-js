<template>
    <div class="container-flex order">
      <div class="row">
        <div class="col-sm-12 col-md-8 ls-order-info">
          <p><a>client :</a> {{ order.user.name }}</p>
          <p><a>adresse de livraison : </a> {{ order.user.address }}</p>

          <order-images v-bind:images="images"></order-images>

          <div class="input-group" v-if="order.tracking_number === null">
            <input type="text" class="form-control" placeholder="numéro de suivi"
            v-model="text_input" aria-label="Recipient's username" aria-describedby="basic-addon2">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button"
                @click.prevent="checkTrackingNumber">
                  Envoyer <font-awesome-icon icon="upload"/>
                </button>
                <button class="btn btn-outline-secondary" type="button" v-b-modal.modal1>
                  Signaler <font-awesome-icon icon="exclamation"/>
                </button>
                <b-modal id="modal1" centered ok-only title="Un problème ?" ok-title="Envoyer">
                  <problem-modal></problem-modal>
                </b-modal>
              </div>
          </div>
          <div v-else>
            <p><a>numéro de suivi :</a> {{ order.tracking_number }}</p>
          </div>
        </div>
        <div class="col-sm-12 col-md-4 rs-order-info">
          <p><a>contact : </a> {{ order.user.phone_number }}</p>
          <p><a>numéro de commande :</a> {{ order.id }}</p>
          <p><a>commande enregistrée le :</a> {{ getDate }} à {{ getTime }}</p>
          <p><a>montant de la commande :</a> {{ formatAmount }}€</p>
        </div>
      </div>
    </div>
</template>

<script>
import ProblemModal from './ProblemModal';
import OrderImages from './OrderImages';

export default {
  props: {
    order: Object,
    images: Array,
  },
  components: {
    'problem-modal': ProblemModal,
    'order-images': OrderImages,
  },
  data() {
    return {
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
        }).then(() => { this.post(); })
        // eslint-disable-next-line
        .catch( (e) => { alert(e.body.message); });
    },
    post() {
      if (this.getDeliveryCompany() !== null) {
        this.$http.post(`${process.env.ADMIN_URL_DEV}/update/order`,
          { order_id: this.order.id,
            tracking_number: this.text_input,
            delivery_service: this.getDeliveryCompany(),
          },
          { headers: { 'x-api-key': process.env.X_API_KEY } },
        ).then((data) => { console.log(data); });
      }
    },
  },
  computed: {
    formatAmount() {
      return parseFloat(this.order.total_amount / 100).toFixed(2);
    },
    getDate() {
      return `${this.order.created_at.slice(8, 10)}/${this.order.created_at.slice(5, 7)}/${this.order.created_at.slice(0, 4)}`;
    },
    getTime() {
      return this.order.created_at.slice(11, 16);
    },
  },
};
</script>

<style scoped>
.order {
  padding: 0 15px;
  border: 2px solid #2193b0;
  border-radius: 10px;
  margin-bottom: 5px;
  overflow: auto;
}
a {
  font-weight: 700;
}
.btn-submit {
  background: mediumaquamarine;
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
.input-group {
  margin-top: 20px;
}
</style>

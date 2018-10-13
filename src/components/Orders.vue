<template>
    <div class="container-flex orders-container">
        <h3>{{ title }} ({{ orders.length }})</h3>
        <single-order v-for="(order, index) in orders"
        v-bind:key="index"
        v-bind:id="order.id"
        v-bind:date="order.created_at"
        v-bind:amount="order.total_amount"
        v-bind:name="order.user.name"
        v-bind:phone="order.user.phone_number"
        v-bind:tracking_number="order.tracking_number"
        v-bind:adresse="order.user.address"
        v-bind:images="images">
        </single-order>
    </div>
</template>

<script>
import singleOrder from './singleOrder';

export default {
  components: { 'single-order': singleOrder },
  props: ['status', 'brand_id', 'sale_id'],
  data() {
    return {
      title: null,
      orders: [],
      images: [
        'https://images.asos-media.com/products/nike-cortez-baskets-en-daim-noir-902803-003/9059685-2?$XXL$&wid=513&fit=constrain',
        'https://images.asos-media.com/products/nike-cortez-baskets-en-daim-noir-902803-003/9059685-3?$XXL$&wid=513&fit=constrain',
      ],
    };
  },
  created() {
    // set container title
    if (this.status === 'new') {
      this.title = 'Nouvelles commandes';
    } else if (this.status === 'processed') {
      this.title = 'Commandes traitées';
    }

    // GET request to retrieve orders
    const options = {
      url: 'https://dev-api-vp.appchoose.io/admin/read/orders',
      method: 'GET',
      headers: { 'x-api-key': process.env.X_API_KEY },
      params: { brand_id: this.brand_id, sale_id: this.sale_id },
    };

    // store the response content in the appropriate container
    this.$http(options).then((data) => {
      console.log(data);
      if (this.status === 'new') {
        this.orders = data.body.orders.filter(order => order.tracking_number === null);
      } else if (this.status === 'processed') {
        this.orders = data.body.orders.filter(order => order.tracking_number != null);
      }
    });
  },
};
</script>

<style scoped>
.orders-container {
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 25px;
}
</style>

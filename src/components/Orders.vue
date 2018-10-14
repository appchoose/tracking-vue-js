<template>
    <div class="container-flex orders-container">
        <h3>{{ title }} ({{ orders.length }})</h3>
        <single-order
        v-for="(order, index) in orders"
        v-bind:key="index"
        v-bind:order="order"
        v-bind:images="images">
        </single-order>
    </div>
</template>

<script>
import SingleOrder from './SingleOrder';

export default {
  components: { 'single-order': SingleOrder },
  props: {
    status: String,
    brand_id: String,
    sale_id: String,
  },
  data() {
    return {
      title: null,
      orders: [
        { id: '4BZER4E24',
          created_at: '2018-10-10',
          total_amount: 100,
          user: { name: 'Roger', phone_number: '0457483982', address: '23, avenue de la liberté 78000 Versailles' },
          tracking_number: null },
      ],
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
      url: `${process.env.ADMIN_URL_DEV}/read/orders`,
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

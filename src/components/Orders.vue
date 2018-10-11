<template>
    <div class="orders-container">
        <table>
            <h3>{{ title }} ({{getOrderSize()}})</h3>
            <app-order v-for="(order, index) in orders"
            v-bind:key="index"
            v-bind:id="order.id"
            v-bind:date="order.created_at"
            v-bind:amount="order.total_price"
            v-bind:name="order.user.name"
            v-bind:tracking_number="order.tracking_number"
            v-bind:adresse="order.user.address">
            </app-order>
        </table>
    </div>
</template>

<script>
import Order from './Order';

export default {
  components: { 'app-order': Order },
  props: ['title', 'new'],
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    getOrderSize() {
      // eslint-disable-next-line
      return this.orders.length;
    },
  },
  created() {
    const options = {
      url: 'https://r0f3fxooni.execute-api.eu-west-1.amazonaws.com/dev/read/orders',
      method: 'GET',
      headers: { 'x-api-key': process.env.X_API_KEY },
      params: {
        brand_id: 'JMsNSbSbDMIzVrcDDwoD2jGOH',
        sale_id: 'YjyF6AwLF15OIZvn4kSChhmRE',
      },
    };
    // eslint-disable-next-line
    this.$http(options).then(function (data) {
      // eslint-disable-next-line
      console.log(data);
      if (this.new) {
        this.orders = data.body.orders.filter(order => order.tracking_number === null);
      } else {
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
table {
    width: 100%;
}
</style>

<template>
    <div class="orders-container">
        <table>
            <h3>{{ title }} ({{ getOrderSize() }})</h3>
            <app-order v-for="(order, index) in orders"
            v-bind:key="index"
            v-bind:id="order.id"
            v-bind:date="order.created_at"
            v-bind:amount="order.total_price"
            v-bind:name="order.user.name"
            v-bind:phone="order.phone"
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
  props: ['title', 'processed'],
  data() {
    return {
      orders: [
        { id: '23f34', created_at: '17-10-2018', total_price: 299, phone: '0763647689', user: { name: 'coco', address: '2, rue Louis Antoine de Bougainville 77680 Roissy-en-Brie' } },
        { id: 'er35g', created_at: '12-10-2018', total_price: 19, phone: '0763649087', user: { name: 'lolo', address: '3, rue de la Liberté 75004 Paris' } },
      ],
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
      if (this.processed === 'false') {
        this.orders = data.body.orders.filter(order => order.tracking_number === null);
      } else if (this.processed === 'true') {
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

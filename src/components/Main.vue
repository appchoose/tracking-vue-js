<template>
  <div>
    <app-header></app-header>
    <app-orders v-bind:title="new_orders_title" status="0"></app-orders>
    <app-orders v-bind:title="processed_orders_title" status="1"></app-orders>
  </div>
</template>

<script>
import Header from './Header';
import Orders from './Orders';

export default {
  name: 'Main',
  components: {
    'app-header': Header,
    'app-orders': Orders,
  },
  data() {
    return {
      new_orders_title: 'Nouvelles commandes',
      processed_orders_title: 'Commandes traitées',
    };
  },
};
</script>

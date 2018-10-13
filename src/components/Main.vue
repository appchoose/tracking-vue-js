<template>
  <div class="container-flex">
    <app-header></app-header>
    <app-orders status='new' v-bind:brand_id="brand_id" v-bind:sale_id="sale_id">
    </app-orders>
    <app-orders status='processed' v-bind:brand_id="brand_id" v-bind:sale_id="sale_id">
    </app-orders>
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
      brand_id: this.$route.params.id,
      sale_id: this.$route.query.sale_id,
    };
  },
};
</script>

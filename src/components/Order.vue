<template>
    <tr>
        <td>{{ id }}</td>
        <td>{{ date }}</td>
        <td>{{ formatPrice }}€</td>
        <td>{{ name }}</td>
        <td>{{ adresse }}</td>
        <td>{{ tracking_number }}</td>
        <td><input type="text"/></td>
        <td><b-button v-on:click="openModal">Remplir</b-button></td>
    </tr>
</template>

<script>
export default {
  props: ['id', 'date', 'amount', 'name', 'tracking', 'adresse'],
  methods: {
    openModal() {
      // alert("poisson d'avril");
    },
  },
  computed: {
    formatPrice() {
      return parseFloat(this.amount / 100).toFixed(2);
    },
  },
};
</script>

<style scoped>
tr {
    border-bottom: 1px solid #008287;
}

.btn {
    background: #f8d764;
    border: white;
    color: black;
    font-weight: 600;
}
</style>

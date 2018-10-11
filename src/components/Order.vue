<template>
    <div class="order">
      <div class="left-container">
        <p><a>client :</a> {{ name }}</p>
        <p><a>adresse de livraison : </a> {{ adresse }}</p>
        <p><a>contact : </a> {{ phone }}</p>
      </div>
      <div class="right-container">
        <p><a>numéro de commande :</a> {{ id }}</p>
        <p><a>commande émise le :</a> {{ date }}</p>
        <p><a>montant de la commande :</a> {{ formatPrice }}€</p>
      </div>
      <td>{{ tracking_number }}</td>
      <td><input type="text"/></td>
      <td><b-button v-on:click="openModal">Remplir</b-button></td>
    </div>
</template>

<script>
export default {
  props: ['id', 'date', 'amount', 'name', 'phone', 'tracking_number', 'adresse'],
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
.order {
  padding: 10px;
  border: 2px solid #008287;
  border-radius: 10px;
  margin-bottom: 5px;
  overflow: auto;
}
.left-container {
  width: 45%;
  display: inline-block;
}
.right-container {
  width: 40%;
  padding-left: 10%;
  display: inline-block;
}
a {
  font-weight: 700;
}
.btn {
    background: #f8d764;
    border: white;
    color: black;
    font-weight: 600;
}
</style>

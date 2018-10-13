<template>
    <div class="container-flex app-header">
        <h2>{{ title }}</h2>
    </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Bienvenue sur votre suivi de commandes',
    };
  },
};
</script>

<style>
.app-header {
  background: #2193b0;
  padding-top: 35px;
  padding-bottom: 30px;
  padding-left: 15px;
  margin-bottom: 25px;
  color: white;
  overflow: auto;
}
h2 {
  font-size: 30px;
}
</style>

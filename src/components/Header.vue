<template>
    <div class="header">
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
.header {
  background: #008287;
  height: 100px;
  padding-top: 30px;
  padding-left: 15px;
  margin-bottom: 25px;
  color: white;
}
h2 {
  font-size: 30px;
}
</style>

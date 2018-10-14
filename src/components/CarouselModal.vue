<template>
  <div>
    <b-carousel controls :interval="0">
      <b-carousel-slide v-for="(img, key) in src" :key="key" v-bind:img-src="img">
      <div>
        Référence :
        <br>
        Taille :
      </div>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  props: {
    src: Array,
  },
  data() {
    return {
    };
  },
};
</script>

<style>
.carousel-control-prev {
  left: -100px;
}
.carousel-control-next {
  right: -100px;
}
.carousel-caption {
  background: white;
  color: black;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>

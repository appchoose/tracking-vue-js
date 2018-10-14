<template>
  <b-card-group>
    <b-card v-for="(img, key) in images" :key="key" v-bind:img-src="img"
    img-top no-body @click="modalShow = !modalShow">
      <b-card-footer>taille : 42</b-card-footer>
    </b-card>
    <b-modal centered hide-header hide-footer v-model="modalShow">
      <carousel-modal v-bind:src="images"></carousel-modal>
    </b-modal>
  </b-card-group>
</template>

<script>
import CarouselModal from './CarouselModal';

export default {
  props: {
    images: Array,
  },
  components: {
    'carousel-modal': CarouselModal,
  },
  data() {
    return {
      modalShow: false,
    };
  },
};
</script>

<style>
.card-group {
  flex-direction: row;
}
.card {
  max-width: 75px;
  margin-right: 15px;
}
.card-footer {
  height: 20px;
  padding: 0 6px;
  font-size: 13px;
}
</style>


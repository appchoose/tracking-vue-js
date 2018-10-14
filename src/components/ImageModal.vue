<template>
  <div>
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                :interval="0"
                background="#ababab"
                img-width="1024"
                img-height="480"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd">
      <b-carousel-slide v-for="(img, key) in src"
      :key="key" v-bind:img-src="img">
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  props: ['src'],
  data() {
    return {
    };
  },
};
</script>


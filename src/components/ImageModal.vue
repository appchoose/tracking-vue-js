<template>
  <div>
    <b-img v-bind:src="src" fluid height='200'/>
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


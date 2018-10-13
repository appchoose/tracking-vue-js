<template>
  <div>
    <b-form-group >
      <b-form-radio-group id="radios1" v-model="selected" :options="options" stacked>
      </b-form-radio-group>
    </b-form-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      options: [
        { text: 'Adresse incomplète', value: 'first' },
        { text: 'Nom incomplet', value: 'second' },
        { text: 'Problème sur la commande', value: 'third' },
      ],
    };
  },
};
</script>


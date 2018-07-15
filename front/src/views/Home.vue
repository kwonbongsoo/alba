<template>
<div>1111111</div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  computed: {
    l_product() {
      this.$store.getters.l_product;
    }
  },
  mounted() {
    this.$store.dispatch('l_product', '');
    this.$store.commit('title', 'Application');
  },
  methods: {
    
  }
}
</script>



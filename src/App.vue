<script>

  import M from 'materialize-css'
  import Navigation from './components/Navigation.vue'  

  export default {
    data() {
      return {

      }
    },

    methods: {
    },
    components: {
      Navigation
    },

    async mounted() {

        M.AutoInit()

    }
  }

</script>

<template>  
  <Navigation />
  <RouterView />
</template>

<style scoped>
</style>

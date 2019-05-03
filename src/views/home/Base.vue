<template>
  <div class="baseV">
    <NavBarC/>
    <router-view/>
    <FooterC/>
  </div>
</template>

<script>
  import NavBarC from '../../components/NavBar.vue'
  import FooterC from '../../components/Footer.vue'

  export default {
    name: 'baseV',
    components: {
      NavBarC,
      FooterC
    }
  }
</script>

<style lang="scss">
  .base {
    background-color: #F2F2F2;
  }
</style>

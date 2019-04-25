<template>
  <div class="baseV">
    <HeaderC/>
    <NavBarC/>
    <router-view/>
    <FooterC/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import NavBarC from '../../components/NavBar.vue'
  import HeaderC from '../../components/Header.vue'
  import FooterC from '../../components/Footer.vue'

  export default {
    name: 'baseV',
    components: {
      NavBarC,
      HeaderC,
      FooterC
    }
  }
</script>

<style lang="scss">
  .base {
    background-color: #F2F2F2;
  }
</style>

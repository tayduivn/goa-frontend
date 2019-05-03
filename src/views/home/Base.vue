<template>
  <div class="base">
    <NavBarC/>
    <main>
      <router-view/>
    </main>
    <FooterC/>
  </div>
</template>

<script>
  import NavBarC from '../../components/NavBar.vue'
  import FooterC from '../../components/Footer.vue'

  export default {
    name: 'base',
    components: {
      NavBarC,
      FooterC
    }
  }
</script>

<style lang="scss">
  .base {
    main {
      padding-top: 61px;
    }
  }
</style>

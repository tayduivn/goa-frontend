<template>
  <div id="cpanel-home" class="d-flex align-items-center justify-content-center">
    <h2>Bienvenido al cPanel de TSL</h2>
  </div>
</template>

<script>
  export default {
    name: "cPanelHome",
    metaInfo: {
      title: 'TSL cPanel',
      titleTemplate: (title) => {
        return `${title} | Inicio`
      }
    },
  }
</script>

<style scoped>
  #cpanel-home {
    height: 100%;
  }
</style>

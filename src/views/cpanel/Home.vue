<template>
  <div id="cpanel-home" class="d-flex align-items-center justify-content-center">
    <h2>Welcome to the control panel of Gardens of America </h2>
  </div>
</template>

<script>
  export default {
    name: "cPanelHome",
    metaInfo: {
      title: 'GOA cPanel',
      titleTemplate: (title) => {
        return `${title} | Home`
      }
    },
  }
</script>

<style scoped>
  #cpanel-home {
    height: 100%;
  }
</style>

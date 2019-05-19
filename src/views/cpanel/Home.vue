<template>
  <div id="cpanel-home" class="d-flex align-items-center justify-content-center text-center">
    <h2>Welcome to cPanel of Gardens of America </h2>
  </div>
</template>

<script>
  import {wordEng} from "../../utils/util"

  export default {
    name: "cPanelHome",
    metaInfo: {
      title: `Gardens of America cPanel`,
      titleTemplate: (title) => {
        return `${title} | Home`
      }
    },
    data() {
      return {
        wordEng: wordEng
      }
    },
  }
</script>

<style scoped>
  #cpanel-home {
    height: 100%;
  }
</style>

<template>
  <div id="cpanel-home" class="d-flex align-items-center justify-content-center">
    <h2>Welcome to the control panel of Gardens of America </h2>
  </div>
</template>

<script>
  import {wordEng} from "../../utils/util"

  export default {
    name: "cPanelHome",
    metaInfo: {
      title: `${this.wordEng.company} cPanel`,
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

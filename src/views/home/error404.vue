<template>
  <div id="error404" class="wrapper">
    <main>
      <div class="container py-5 dash-right">
        <h1 class="text-center">Page not found</h1>
        <h3 class="text-center">Error 404</h3>
        <hr>
        <p class="text-center">
          <router-link to="/" class="enlace">Go to homepage</router-link>
        </p>
      </div>
    </main>
  </div>
</template>
<script>
  import {wordEng} from "../../utils/util"

  export default {
    name: "error",
    metaInfo: {
      title: this.wordEng.company,
      titleTemplate: (title) => {
        return `${title} | Page not found`
      }
    },
    data() {
      return {
        wordEng: wordEng
      }
    },
  }
</script>

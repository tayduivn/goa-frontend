<template>
  <div id="error404" class="wrapper">
    <main>
      <div class="container py-5 dash-right">
        <h1 class="text-center">Page not found</h1>
        <hr>
        <p class="text-center font-weight-bold">
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
      title: 'Gardens of America',
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

<style scoped>
  #error404 {
    background-size: contain;
    background: #04a9eb url("../../assets/img/error404.jpg") no-repeat 50% 70%;
    height: 100vh;
    color: white;
  }
</style>

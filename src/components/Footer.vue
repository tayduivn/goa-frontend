<template>
  <div class="Footer pt-4 pb-4">
    <hr>
    <div class="container">
      <div class="row">
        <p class="col-md-12 copyright mb-2">Copyright © 2019 TSL. Todos los derechos reservados.</p>
        <div class="col-md-12">
          <router-link class="global-link" to="/politics">Política de privacidad</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .Footer {
    background-color: white;

    .copyright {
      color: #b7b7b7;
    }
  }
</style>

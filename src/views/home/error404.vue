<template>
  <div id="error404" class="wrapper">
    <main>
      <div class="container py-5 dash-right">
        <h1 class="text-center">Página no encontrada</h1>
        <h3 class="text-center">Error 404</h3>
        <hr>
        <p class="text-center">
          <router-link to="/" class="enlace">Ir a la página de inicio</router-link>
        </p>
      </div>
    </main>
  </div>
</template>
<script>
  export default {
    name: "error",
    metaInfo: {
      title: 'TSL',
      titleTemplate: (title) => {
        return `${title} | Página no encontrada`
      }
    },
  }
</script>

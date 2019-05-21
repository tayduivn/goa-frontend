<template>
  <div>
    <h1 class="text-center">Guide Gardens of America</h1>
    <hr>

    <h2 class="text-center mb-3">Title</h2>
    <img src="../../assets/img/Guide/error404.jpg" alt="help 1" class="img-fluid">
    <div class="p-3">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam aut beatae cum excepturi facilis hic ipsum
        minima molestias mollitia nihil, omnis quas rerum sunt suscipit ullam veniam voluptatibus voluptatum.</p>
    </div>
    <hr>

    <h2 class="text-center mb-3">Title</h2>
    <img src="../../assets/img/Guide/error404.jpg" alt="help 1" class="img-fluid">
    <div class="p-3">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam aut beatae cum excepturi facilis hic ipsum
        minima molestias mollitia nihil, omnis quas rerum sunt suscipit ullam veniam voluptatibus voluptatum.</p>
    </div>

  </div>
</template>

<script>

  export default {
    name: "Guide",
    metaInfo: {
      title: 'Gardens of America cPanel',
      titleTemplate: (title) => {
        return `${title} | Guide`
      }
    },
  }
</script>

<style scoped>
  h1 {
    font-size: 2.2rem;
  }

  p {
    color: #515151;
  }

  img {
    width: 100%;
  }
</style>

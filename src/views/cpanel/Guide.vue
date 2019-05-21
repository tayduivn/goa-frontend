<template>
  <div>
    <h1 class="text-center">Guide Gardens of America</h1>
    <hr>


    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col" width="10px">Nº</th>
        <th scope="col">Name</th>
        <th scope="col">Date</th>
        <th scope="col" width="10"></th>
        <th scope="col" width="10"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(category, index) of categories" :key="category.id">
        <th scope="col">{{++index}}</th>
        <td>{{category.name}}</td>
        <td>{{formaDate(category.inserted_at)}}</td>
        <td>
          <button class="btn btn-sm btn-success" @click.prevent="openModal(category)">
            {{wordEng.edit}}
          </button>
        </td>
        <td>
          <button class="btn btn-sm btn-danger" @click.prevent="deleteData(category.id)" :disabled="!!submitForm">
            {{wordEng.delete}}
          </button>
        </td>
      </tr>
      </tbody>
    </table>

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

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <h3>Information of the category</h3>
      <form @submit.prevent="sendData">
        <div class="form-group">
          <label for="name" class="mt-3 mb-3">Name</label>
          <input class="form-control" id="name" type="text" v-model="category.name" required>
        </div>
        <div class="text-right">
          <button type="submit" class="btn-sm btn-primary" :disabled="!!submitForm">{{wordEng.save}}</button>
        </div>
      </form>
    </vue-modaltor>

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
    data() {
      return {
        guide: {},
        guides: [
          {
            title: 'Clients',
            image: require('../../assets/img/Guide/error404.jpg'),
            content: 'Information of clients'
          },
        ]
      }
    },
    methods: {
      openModal(guide) {
        this.open = true

      },
      hideModal() {
        this.open = false
      },
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

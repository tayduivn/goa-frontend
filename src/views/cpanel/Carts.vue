<template>
  <div>

    <div v-if="images && images === 'loading'">
      <h3>Cargando datos...</h3>
    </div>
    <div v-else-if="images && images !== 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3 class="mb-2">Lista de Imágenes</h3>
        <div class="text-right">
          <button class="btn-sm btn-primary" @click.prevent="openModal(null)">Crear nuevo</button>
        </div>
      </div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col" width="10px">Nº</th>
          <th scope="col">Fecha</th>
          <th scope="col" width="10"></th>
          <th scope="col" width="10"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(image, index) of images" :key="image.idimages">
          <th scope="col">{{++index}}</th>
          <td>{{formaDate(image.date_created)}}</td>
          <td>
            <button class="btn btn-sm btn-success" @click.prevent="openModal(image, false)">
              Editar
            </button>
          </td>
          <td>
            <button class="btn btn-sm btn-danger" @click.prevent="deleteData(image.idimages)">
              Eliminar
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="images && images === 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3>No hay datos registrados</h3>
        <div class="text-right">
          <button class="btn-sm btn-primary" @click.prevent="openModal(null)">Crear nuevo</button>
        </div>
      </div>
    </div>
    <div v-else-if="images && images === 'error'">
      <h3>Error recuperando datos</h3>
    </div>

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <h3>Información para la imagen</h3>
      <form @submit.prevent="sendData">
        <div class="form-group">
          <label>Imagen</label>
          <input type="file" class="form-control" accept="image/*" @change="subirImagen" required>
          <p class="m-0 p-0 text-left">
            <small>Subir una imagen.</small>
          </p>
        </div>
        <div v-if="image.idimages !== ''" class="image-content">
          <img :src="image.image" :alt="image.name">
        </div>
        <div class="text-right">
          <button type="submit" class="btn-sm btn-primary">Guardar</button>
        </div>
      </form>
    </vue-modaltor>

  </div>
</template>

<script>
  import CloseImageSVG from "../../components/CloseImageSVG"

  export default {
    name: "Carts",
    components: {CloseImageSVG},
    metaInfo: {
      title: 'TSL cPanel',
      titleTemplate: (title) => {
        return `${title} | Imágenes del Home`
      }
    },
    data() {
      return {
        open: false
      }
    },
    computed: {
      images() {
        return this.$store.getters.getCarts
      }
    },
    created() {
      this.$store.dispatch('getCarts')
    },
    methods: {
      openModal(image) {
        this.open = true
        this.image = image
      },
      hideModal() {
        this.open = false
      },
      formaDate(today) {
        return new Date(today).toLocaleDateString("es-ES")
      }
    },
  }
</script>

<style scoped>
  .image-content {
    width: 200px;
    height: 200px;
  }

  .image-content img {
    width: 100%;
  }
</style>

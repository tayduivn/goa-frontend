<template>
  <div>

    <div v-if="categories && categories === 'loading'">
      <h3>Cargando datos...</h3>
    </div>
    <div v-else-if="categories && categories !== 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3 class="mb-2">Lista de Categorías</h3>
        <div class="text-right">
          <button class="btn-sm btn-primary" @click.prevent="openModal(null)">Crear nuevo</button>
        </div>
      </div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col" width="10px">Nº</th>
          <th scope="col">Nombre</th>
          <th scope="col">Fecha</th>
          <th scope="col" width="10"></th>
          <th scope="col" width="10"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(category, index) of categories" :key="category.idcategory">
          <th scope="col">{{++index}}</th>
          <td>{{category.name}}</td>
          <td>{{formaDate(category.date_created)}}</td>
          <td>
            <button class="btn btn-sm btn-success" @click.prevent="openModal(category, false)">
              Editar
            </button>
          </td>
          <td>
            <button class="btn btn-sm btn-danger" @click.prevent="deleteData(category.idcategory)">
              Eliminar
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="categories && categories === 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3>No hay datos registrados</h3>
        <div class="text-right">
          <button class="btn-sm btn-primary" @click.prevent="openModal(null)">Crear nuevo</button>
        </div>
      </div>
    </div>
    <div v-else-if="categories && categories === 'error'">
      <h3>Error recuperando datos</h3>
    </div>

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <h3>Información para la categoría</h3>
      <form @submit.prevent="sendData">
        <div class="form-group">
          <label for="name" class="mt-3 mb-3">Nombre</label>
          <input class="form-control" id="name" type="text" v-model="category.name" required>
        </div>
        <div class="form-group">
          <label>Imagen</label>
          <input id="image-category" type="file" class="form-control" accept="image/*" @change="subirImagen" required>
          <p class="m-0 p-0 text-left"><small>Subir una imagen.</small></p>
        </div>
        <div v-if="category.idcategory !== ''" class="image-content">
          <img :src="category.image" :alt="category.name">
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
  import axios from 'axios'
  import config from "./../../config/config";
  import {handleError} from "../../utils/util"
  import {confirmMessage, successMessage} from "../../utils/handle-message"
  import {modelCategory} from "../../services/model/model-categories"

  export default {
    name: "categories",
    metaInfo: {
      title: 'TSL cPanel',
      titleTemplate: (title) => {
        return `${title} | Categorías`
      }
    },
    components: {CloseImageSVG},
    data() {
      return {
        category: modelCategory,
        formData: null,
        open: false
      }
    },
    computed: {
      categories() {
        return this.$store.getters.getCategories
      }
    },
    created() {
      this.$store.dispatch('getCategories')
      this.formData = new FormData()
    },
    methods: {
      sendData() {
        if (this.category.idcategory === '') {
          this.saveData()
        } else {
          this.editData()
        }
      },
      subirImagen(event) {
        let files = event.target.files
        this.formData.delete('image')
        if (files.length) {
          for (let image of files) {
            this.formData.append('image', image, image.name)
          }
        }
      },
      successRequest (title) {
        successMessage(this.$swal, title)
        this.$store.dispatch('getCategories')
        this.category = modelCategory.reset()
        this.hideModal()
        console.clear()
      },
      formDataSend() {
        this.formData.delete('idcategory')
        this.formData.append('idcategory', this.category.idcategory)
        this.formData.delete('name')
        this.formData.append('name', this.category.name)
      },
      saveData() {
        this.formDataSend()
        axios({
          method: 'POST',
          url: `${config.api_url}/api/admin/category/register`,
          headers: {
            Authorization: localStorage.token
          },
          data: this.formData
        })
          .then(() => {
            this.successRequest("Creado", "Creado")
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      },
      editData() {
        this.formDataSend()
        axios({
          method: 'POST',
          url: `${config.api_url}/api/admin/category/update`,
          headers: {
            Authorization: localStorage.token
          },
          data: this.formData
        })
          .then(() => {
            this.successRequest("Creado", "Editado")
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      },
      deleteData(idcategory) {
        confirmMessage(this.$swal)
          .then(res => {
            if (res){
              axios({
                method: 'DELETE',
                url: `${config.api_url}/api/admin/category/delete`,
                headers: {
                  Authorization: localStorage.token
                },
                data: {idcategory}
              })
                .then(() => {
                  this.successRequest("Creado", "Eliminado")
                })
                .catch(err => {
                  handleError(this.$swal, err)
                })
            }
          })
      },
      openModal(category, isCreate = true) {
        this.open = true
        if (!isCreate) {
          this.category = category
        }
      },
      hideModal() {
        this.open = false
        this.category = modelCategory.reset()
        const file = document.getElementById("image-category");
        file.value = file.defaultValue;
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

  .image-content img{
    width: 100%;
  }
</style>

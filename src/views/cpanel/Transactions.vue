<template>
  <div>

    <div v-if="services && services === 'loading'">
      <h3>Cargando datos...</h3>
    </div>
    <div v-else-if="services && services !== 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3 class="mb-2">Lista de Servicios</h3>
        <div class="text-right">
          <button class="btn-sm btn-primary" @click.prevent="openModal(null)">Crear nuevo</button>
        </div>
      </div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col" width="10px">Nº</th>
          <th scope="col">Nombre</th>
          <th scope="col">Categoría</th>
          <th scope="col">Fecha</th>
          <th scope="col" width="10"></th>
          <th scope="col" width="10"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(service, index) of services" :key="service.idmessage_service">
          <th scope="col">{{++index}}</th>
          <td>{{service.name}}</td>
          <td>{{service.catName}}</td>
          <td>{{formaDate(service.date_created)}}</td>
          <td>
            <button class="btn btn-sm btn-success" @click.prevent="openModal(service, false)">
              Editar
            </button>
          </td>
          <td>
            <button class="btn btn-sm btn-danger" @click.prevent="deleteData(service.idservice)">
              Eliminar
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="services && services === 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3>No hay datos registrados</h3>
        <div class="text-right">
          <button class="btn-sm btn-primary" @click.prevent="openModal(null)">Crear nuevo</button>
        </div>
      </div>
    </div>
    <div v-else-if="services && services === 'error'">
      <h3>Error recuperando datos</h3>
    </div>

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <form v-if="categories && categories !== 'empty'" @submit.prevent="sendData">
        <h3>Información para el servicio</h3>
        <div class="form-group">
          <label for="name" class="mt-3 mb-3">Nombre</label>
          <input class="form-control" id="name" type="text" v-model="service.name" required>
        </div>
        <div class="form-group">
          <label>Imagen</label>
          <input id="image-service" type="file" class="form-control" accept="image/*" @change="subirImagen" required>
          <p class="m-0 p-0 text-left"><small>Subir una imagen.</small></p>
        </div>
        <div class="form-group">
          <label for="category">Categorías</label>
          <select class="form-control" name="category" id="category" required v-model="service.category_idcategory">
            <option value="">Seleccionar</option>
            <option v-for="item in categories" :key="item.idcategory" :value="item.idcategory">
              {{ item.name }}
            </option>
          </select>
        </div>
        <div v-if="service.idmessage_notification !== '' && service.image"
             class="d-flex justify-content-between">
          <div class="image-content">
            <img :src="service.image" :alt="service.name">
          </div>
          <div class="text-right">
            <button type="submit" class="btn-sm btn-primary">Guardar</button>
          </div>
        </div>
        <div v-else class="text-right">
          <button type="submit" class="btn-sm btn-primary">Guardar</button>
        </div>
      </form>
      <div v-else class="info-service p-5">
        <h3>Necesita de al menos una categoría</h3>
        <router-link to="categories" class="mt-3">Haz click aquí</router-link>
      </div>
    </vue-modaltor>

  </div>
</template>

<script>
  import CloseImageSVG from "../../components/CloseImageSVG"
  import axios from 'axios'
  import config from "./../../config/config";
  import {handleError} from "../../utils/util"
  import {confirmMessage, successMessage} from "../../utils/handle-message"
  import {modelReviews} from "../../services/model/model-reviews"

  export default {
    name: "Transactions",
    metaInfo: {
      title: 'TSL cPanel',
      titleTemplate: (title) => {
        return `${title} | Servicios`
      }
    },
    components: {CloseImageSVG},
    data() {
      return {
        service: modelReviews,
        formData: null,
        open: false
      }
    },
    computed: {
      services() {
        return this.$store.getters.getServices
      },
      categories() {
        return this.$store.getters.getCategories
      }
    },
    created() {
      this.$store.dispatch('getServices')
      this.$store.dispatch('getCategories')
      this.formData = new FormData()
    },
    methods: {
      sendData() {
        if (this.service.idservice === '') {
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
        this.$store.dispatch('getServices')
        this.service = modelReviews.reset()
        this.hideModal()
        console.clear()
      },
      formDataSend() {
        this.formData.delete('idservice')
        this.formData.append('idservice', this.service.idservice)
        this.formData.delete('name')
        this.formData.append('name', this.service.name)
        this.formData.delete('category_idcategory')
        this.formData.append('category_idcategory', this.service.category_idcategory)
      },
      saveData() {
        this.formDataSend()
        axios({
          method: 'POST',
          url: `${config.api_url}/api/admin/service/register`,
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
          url: `${config.api_url}/api/admin/service/update`,
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
      deleteData(idservice) {
        confirmMessage(this.$swal)
          .then(res => {
            if (res){
              axios({
                method: 'DELETE',
                url: `${config.api_url}/api/admin/service/delete`,
                headers: {
                  Authorization: localStorage.token
                },
                data: {idservice}
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
      openModal(service, isCreate = true) {
        this.open = true
        if (!isCreate) {
          this.service = service
        }
      },
      hideModal() {
        this.open = false
        this.service = modelReviews.reset()
        const file = document.getElementById("image-service");
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
  }

  .image-content img{
    width: 100%;
  }

  .info-service a {
    color: dodgerblue;
    display: block;
  }
</style>

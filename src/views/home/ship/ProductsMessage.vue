<template>
  <div class="ship-order">
    <form @submit.prevent="send">
      <div class="form-group">
        <label class="font-weight-bold" for="service">Seleccione un servicio</label>
        <select class="form-control width-reset ml-3" name="service" id="service" v-model="object.service_idservice">
          <option v-for="item in services" :key="item.idservice" :value="item.idservice">
            {{ item.name }}
          </option>
        </select>
      </div>
      <hr>
      <div class="form-group">
        <label for="name">Nombre</label>
        <input class="form-control" id="name" type="text" v-model="object.name_object" required>
      </div>
      <div class="row">
        <div class="form-group col-md-3">
          <label for="height">Altura</label>
          <input class="form-control" id="height" type="number" v-model="object.height" required>
        </div>
        <div class="form-group col-md-3">
          <label for="width">Ancho</label>
          <input class="form-control" id="width" type="number" v-model="object.width" required>
        </div>
        <div class="form-group col-md-3">
          <label for="weight">Peso</label>
          <input class="form-control" id="weight" type="number" v-model="object.weight" required>
        </div>
        <div class="form-group col-md-3">
          <label for="quantity">Cantidad</label>
          <input class="form-control" id="quantity" type="number" v-model="object.quantity" required>
        </div>
      </div>
      <hr>
      <div class="form-group">
        <label>Imagen (opcional)</label>
        <input type="file" class="form-control" accept="image/*" @change="subirImagen">
      </div>
      <div class="mt-4 text-right">
        <button class="global-button" type="submit">Siguiente</button>
      </div>
    </form>
  </div>
</template>

<script>
  import {modelProduct} from "../../../services/model/model-product"

  export default {
    name: "ProductsMessage",
    data() {
      return {
        object: modelProduct,
      }
    },
    computed: {
      services() {
        return this.$store.getters.getServicesCategory;
      }
    },
    created() {
      this.object = modelProduct.reset()
      this.$store.dispatch('getServicesCategory', localStorage.getItem('idCategory'))
      this.$parent.setCurrentPath()
      try {
        this.object = JSON.parse(this.$store.getters.getObject)
      } catch (e) {
        this.object = modelProduct.reset()
      }
    },
    methods: {
      subirImagen(event) {
        const files = event.target.files
        this.$store.dispatch('setOrderFileImage', files)
      },
      send() {
        this.$store.dispatch('setOrderObject', JSON.stringify(this.object))
        this.$router.push('order')
      }
    },
  }
</script>

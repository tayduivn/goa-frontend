<template>
  <div>

    <div v-if="products && products === 'loading'">
      <h3>{{wordEng.loading}}</h3>
    </div>
    <div v-else-if="products && products !== 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3 class="mb-2">List of products</h3>
        <div class="text-right">
          <button class="btn-sm btn-primary" @click.prevent="openModal(null, 'products')">{{wordEng.save}}</button>
        </div>
      </div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col" width="10px">Nº</th>
          <th scope="col">Name</th>
          <th scope="col" width="10"></th>
          <th scope="col" width="10"></th>
          <th scope="col" width="10"></th>
          <th scope="col" width="10"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(product, index) of products" :key="product.idproduct">
          <th scope="col">{{++index}}</th>
          <td>{{product.name}}</td>
          <td>
            <button class="btn btn-sm btn-primary" @click.prevent="openModal(product, 'categories')">Categorías</button>
          </td>
          <td>
            <button class="btn btn-sm btn-primary" @click.prevent="openModal(product, 'images')">Imágenes</button>
          </td>
          <td>
            <button class="btn btn-sm btn-primary" @click.prevent="openModal(product, 'products')">Editar</button>
          </td>
          <td>
            <button class="btn btn-sm btn-danger" @click.prevent="deleteData(product.id)">
              Eliminar
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="products && products === 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3>{{wordEng.noData}}</h3>
        <div class="text-right">
          <button class="btn-sm btn-primary" @click.prevent="openModal(null, 'products')">{{wordEng.save}}</button>
        </div>
      </div>
    </div>
    <div v-else-if="products && products === 'error'">
      <h3>{{wordEng.error}}</h3>
    </div>

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <div v-if="modalType === 'products'">
        <h3>Information of the products | Date creation {{product.inserted_at}}</h3>
        <form @submit.prevent="sendData">
          <div class="row">
            <div class="form-group col-md-4 col-12">
              <label for="sku" class="mt-3 mb-3">SKU</label>
              <input class="form-control" id="sku" type="text" v-model="product.sku" required
                     :disabled="product.id !== ''">
            </div>
            <div class="form-group col-md-8 col-12">
              <label for="name" class="mt-3 mb-3">Name</label>
              <input class="form-control" id="name" type="text" v-model="product.name" required>
            </div>
          </div>
          <div class="form-group">
            <label for="description_short" class="mt-3 mb-3">Description short</label>
            <input class="form-control" id="description_short" type="text" v-model="product.description_short" required>
          </div>
          <div class="form-group">
            <label for="description_one" class="mt-3 mb-3">Description long one</label>
            <input class="form-control" id="description_one" type="text" v-model="product.description_one" required>
          </div>
          <div class="form-group">
            <label for="description_two" class="mt-3 mb-3">Description long two</label>
            <input class="form-control" id="description_two" type="text" v-model="product.description_two" required>
          </div>
          <div class="form-group">
            <label for="preparation" class="mt-3 mb-3">Preparation</label>
            <input class="form-control" id="preparation" type="text" v-model="product.preparation" required>
          </div>
          <div class="row">
            <div class="form-group col-md-6 col-12">
              <label for="regular_price" class="mt-3 mb-3">Price</label>
              <input class="form-control" id="regular_price" type="text" v-model="product.regular_price" required>
            </div>
            <div class="form-group col-md-6 col-12">
              <label for="quantity" class="mt-3 mb-3">Quantity</label>
              <input class="form-control" id="quantity" type="text" v-model="product.quantity" required>
            </div>
          </div>
          <div class="text-right">
            <button type="submit" class="btn-sm btn-primary">{{wordEng.save}}</button>
          </div>
        </form>
      </div>
      <div v-else-if="modalType === 'categories'">
        <h4>{{product.name}} - Categorías</h4>
        <div v-if="product.id === ''">
          <p>First you need to create the product before assigning a category</p>
        </div>
        <form v-else class="mb-3 mt-3">
          <label v-for="category in categories" :key="category.id" :for="category.id">
            {{category.name}}
            <input :id="category.id" class="ml-2 mr-4" type="checkbox" :checked="checkCategory(category, product)"
                   @change="sendCategory($event, product.id, category.id)">
          </label>
        </form>
      </div>
      <div v-else-if="modalType === 'images'">
        <h4>{{product.name}}</h4>
        <hr>
        <h4>{{wordEng.addImage}}</h4>
        <form @submit.prevent="saveDataImage">
          <div class="form-group">
            <label>Imagen</label>
            <input id="image-product" type="file" class="form-control" accept="image/*" @change="subirImagen" required>
            <p class="m-0 p-0 text-left">
              <small>{{wordEng.upload}}</small>
            </p>
          </div>
          <div class="text-right">
            <button :disabled="!!submitForm" type="submit" class="btn-sm btn-primary">Guardar</button>
          </div>
        </form>
        <hr>
        <div>
          <h4>Edit images</h4>
          <form v-for="image in product.images" :key="image.id_image">
            <hr>
            <div class="row">
              <div class="image-content col-md-4 col-12">
                <img :src="image.image" :alt="image.id_image">
              </div>
              <div class="image-content col-md-8 col-12">
                <div class="form-group">
                  <label>Image</label>
                  <input type="file" class="form-control" accept="image/*" @change="subirImagen" required>
                  <p class="m-0 p-0 text-left">
                    <small>{{wordEng.upload}}</small>
                  </p>
                </div>
                <div class="text-right" v-if="image.id_image !== 0">
                  <button :disabled="!!submitForm" type="submit" class="btn-sm btn-primary"
                          @click.prevent="editDataImage(image.id_image)">
                    {{wordEng.save}}
                  </button>
                  <button :disabled="!!submitForm" type="submit" class="btn-sm btn-danger ml-3"
                          @click.prevent="deleteDataImage(image.id_image)">
                    {{wordEng.delete}}}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </vue-modaltor>

  </div>
</template>

<script>
  import CloseImageSVG from "../../components/CloseImageSVG"
  import {handleError, wordEng} from "../../utils/util"
  import {confirmMessage, successMessage} from "../../utils/handle-message"
  import {modelProduct} from "../../services/model/model-product"
  import {apiImages, apiProducts, apiProductsCategories, getAxios} from "../../utils/endpoints"

  export default {
    name: "cPanelProducts",
    metaInfo: {
      title: `${this.wordEng.company} cPanel`,
      titleTemplate: (title) => {
        return `${title} | Products`
      }
    },
    components: {CloseImageSVG},
    data() {
      return {
        modalType: 'products',
        product: modelProduct,
        submitForm: false,
        formData: null,
        open: false,
        wordEng: wordEng,
      }
    },
    computed: {
      products() {
        return this.$store.getters.getProducts
      },
      categories() {
        return this.$store.getters.getCategories
      },
    },
    created() {
      this.$store.dispatch('getProducts')
      this.$store.dispatch('getCategories')
      this.formData = new FormData()
    },
    methods: {
      checkCategory(category, product) {
        if (product.categories === undefined) return
        return product.categories.find(value => value.id === category.id) !== undefined
      },
      sendCategory(event, product_id, category_id) {
        console.log(JSON.stringify({product_id, category_id}))
        if (event.target.checked) {
          getAxios(apiProductsCategories.all, 'POST', {product_id, category_id})
            .then(() => {
              console.log('Category send')
            })
            .catch(err => {
              handleError(this.$swal, err)
            })
        } else {
          getAxios(apiProductsCategories.all, 'DELETE', {product_id, category_id})
            .then(() => {
              console.log('Category deleted')
            })
            .catch(err => {
              handleError(this.$swal, err)
            })
        }
      },
      sendData() {
        if (this.product.id === '') {
          this.saveData()
        } else {
          this.editData()
        }
      },
      successRequest(title) {
        successMessage(this.$swal, title)
        this.$store.dispatch('getProducts')
        this.hideModal()
      },
      saveData() {
        getAxios(apiProducts.all, 'POST', this.product)
          .then(() => {
            this.successRequest(this.wordEng.created)
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      },
      editData() {
        getAxios(apiProducts.all, 'PUT', this.product)
          .then(() => {
            this.successRequest(this.wordEng.edited)
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      },
      deleteData(id) {
        confirmMessage(this.$swal)
          .then(res => {
            if (res) {
              getAxios(apiProducts.all, 'DELETE', {id})
                .then(() => {
                  this.successRequest(this.wordEng.deleted)
                })
                .catch(err => {
                  handleError(this.$swal, err)
                })
            }
          })
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
      formDataSend(id = '') {
        this.submitForm = true
        this.formData.delete('id')
        this.formData.append('id', id)
        this.formData.delete('product_id')
        this.formData.append('product_id', this.product.id)
      },
      saveDataImage() {
        this.formDataSend()
        getAxios(apiImages.register, 'POST', this.formData)
          .then(() => {
            this.submitForm = false
            successMessage(this.$swal, this.wordEng.created)
            this.$store.dispatch('getProducts')
              .then(() => {
                this.product = this.products.find(value => value.id === this.product.id)
              })
              .catch(err => {
                handleError(this.$swal, err)
              })
          })
          .catch(err => {
            this.submitForm = false
            handleError(this.$swal, err)
          })
      },
      editDataImage(id) {
        this.formDataSend(id)
        getAxios(apiImages.update, 'POST', this.formData)
          .then(() => {
            this.submitForm = false
            successMessage(this.$swal, this.wordEng.edited)
            this.$store.dispatch('getProducts')
              .then(() => {
                this.product = this.products.find(value => value.id === this.product.id)
              })
              .catch(err => {
                handleError(this.$swal, err)
              })
          })
          .catch(err => {
            this.submitForm = false
            handleError(this.$swal, err)
          })
      },
      deleteDataImage(id) {
        console.log(id)
        confirmMessage(this.$swal)
          .then(res => {
            if (res) {
              getAxios(apiImages.all, 'DELETE', {id})
                .then(() => {
                  this.submitForm = false
                  successMessage(this.$swal, this.wordEng.deleted)
                  this.$store.dispatch('getProducts')
                    .then(() => {
                      this.product = this.products.find(value => value.id === this.product.id)
                    })
                    .catch(err => {
                      handleError(this.$swal, err)
                    })
                })
                .catch(err => {
                  this.submitForm = false
                  handleError(this.$swal, err)
                })
            }
          })
      },
      openModal(product = null, modalType) {
        this.open = true
        this.modalType = modalType
        if (product !== null) {
          this.product = product
        }
        this.product.user_id = JSON.parse(localStorage.getItem('user')).id
      },
      hideModal() {
        this.open = false
        this.product = modelProduct.reset()
        if (this.modalType === 'images') {
          const file = document.getElementById("image-product");
          file.value = file.defaultValue;
        }
        if (this.modalType === 'categories') {
          this.$store.dispatch('getProducts')
        }
      },
      formaDate(today) {
        return new Date(today).toLocaleDateString("es-ES")
      }
    },
  }
</script>

<style scoped>
  .image-content {
    height: 200px;
    overflow: hidden;
    width: 200px;
  }

  .image-content img {
    width: 100%;
  }
</style>

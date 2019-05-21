<template>
  <div>

    <div v-if="products && products === 'loading'">
      <h3>{{wordEng.loading}}</h3>
    </div>
    <div v-else-if="products && products !== 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3 class="mb-2">List of products</h3>
        <div class="text-right">
          <button class="btn-sm btn-primary" @click.prevent="openModal(null, 'products')">{{wordEng.create}}</button>
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
            <button class="btn btn-sm btn-primary" @click.prevent="openModal(product, 'categories')">Categories</button>
          </td>
          <td>
            <button class="btn btn-sm btn-primary" @click.prevent="openModal(product, 'images')">Images</button>
          </td>
          <td>
            <button class="btn btn-sm btn-primary" @click.prevent="openModal(product, 'products')">Edit</button>
          </td>
          <td>
            <button class="btn btn-sm btn-danger" @click.prevent="deleteData(product.id)">
              Delete
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
      <!-- Products -->
      <div v-if="modalType === 'products'">
        <h3>Information of the products</h3>
        <small v-if="product.id">Date of creation {{product.inserted_at}}</small>
        <form @submit.prevent="sendData">
          <div class="form-group">
            <label for="name" class="mt-3 mb-3">Name</label>
            <input class="form-control" id="name" type="text" v-model="product.name" required>
          </div>
          <div class="form-group">
            <label for="description_short" class="mt-3 mb-3">Description short</label>
            <input class="form-control" id="description_short" type="text" v-model="product.description_short" required>
          </div>
          <div class="form-group">
            <label for="description_one" class="mt-3 mb-3">Description long one</label>
            <textarea class="form-control" id="description_one" type="text" v-model="product.description_one" rows="4"
                      required>
            </textarea>
          </div>
          <div class="form-group">
            <label for="description_two" class="mt-3 mb-3">Description long two</label>
            <textarea class="form-control" id="description_two" type="text" v-model="product.description_two" rows="4"
                      required>
            </textarea>
          </div>
          <div class="form-group">
            <label for="preparation" class="mt-3 mb-3">Preparation</label>
            <editor api-key="jacqarp06rcghdz48vaz7eury006fqlaleut2zpx6mvc7ces" v-model="product.preparation"
                    id="preparation" :init="{mode: 'textareas'}">
            </editor>
          </div>
          <div class="form-group">
            <label class="mt-3 mb-3">Nutrition</label>
            <input type="file" class="form-control" accept="image/*" @change="subirImagenNutrition" required>
            <p class="m-0 p-0 text-left">
              <small>{{wordEng.upload}}</small>
            </p>
          </div>
          <div class="row">
            <div class="form-group col-md-3 col-6">
              <label for="regular_price" class="mt-3 mb-3">Price</label>
              <input class="form-control" id="regular_price" type="text" v-model="product.regular_price" required>
              <p class="m-0 p-0 text-left">
                <small>Decimal point to cents</small>
              </p>
            </div>
            <div class="form-group col-md-3 col-6">
              <label for="quantity" class="mt-3 mb-3">Quantity</label>
              <input class="form-control" id="quantity" type="text" v-model="product.quantity" required>
            </div>
          </div>
          <div class="text-right">
            <button type="submit" :disabled="!!submitForm" class="btn-sm btn-primary">{{wordEng.save}}</button>
          </div>
        </form>
      </div>
      <!-- Categories -->
      <div v-else-if="modalType === 'categories'">
        <h4>{{product.name}} - Categorías</h4>
        <hr>
        <div v-if="product.id === ''">
          <p>First you need to create the product before assigning a category</p>
        </div>
        <form v-else class="mt-3">
          <label class="category-text" v-for="(category, index) in categories" :key="category.id" :for="category.id">
            <input :id="category.id" class="ml-4 mr-2" type="checkbox"
                   :checked="checkCategory(index, category, product)"
                   @change="sendCategory($event, product.id, category.id, index)">
            <span>{{category.name}}</span>
          </label>
          <div class="text-right saved-text">
            <span :class="{transaction: isActiveText}">Saved</span>
          </div>
        </form>
      </div>
      <!-- Images -->
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
            <button :disabled="!!submitForm" type="submit" class="btn-sm btn-primary">{{wordEng.save}}</button>
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
              <div class="image-content col-md-8 col-12" v-if="image.id_image !== '0'">
                <div class="form-group">
                  <label>Image</label>
                  <input type="file" class="form-control" accept="image/*" @change="subirImagen" required>
                  <p class="m-0 p-0 text-left">
                    <small>{{wordEng.upload}}</small>
                  </p>
                </div>
                <div class="text-right">
                  <button :disabled="!!submitForm" type="submit" class="btn-sm btn-primary"
                          @click.prevent="editDataImage(image.id_image)">
                    {{wordEng.save}}
                  </button>
                  <button :disabled="!!submitForm" type="submit" class="btn-sm btn-danger ml-3"
                          @click.prevent="deleteDataImage(image.id_image)">
                    {{wordEng.delete}}
                  </button>
                </div>
              </div>
              <div class="image-content col-md-8 col-12" v-else>
                <h6>This image is by default. Upload new image</h6>
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
  import Editor from '@tinymce/tinymce-vue';

  export default {
    name: "cPanelProducts",
    metaInfo: {
      title: `Gardens of America cPanel`,
      titleTemplate: (title) => {
        return `${title} | Products`
      }
    },
    components: {CloseImageSVG, 'editor': Editor},
    data() {
      return {
        isActiveText: false,
        modalType: 'products',
        product: modelProduct.reset(),
        submitForm: false,
        formData: null,
        open: false,
        wordEng: wordEng,
        categoryType: [],
        categoryStart: false,
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
      checkCategory(index, category, product) {
        if (this.categoryStart) {
          return this.categoryType[index]
        }
        /* Product without categories */
        if (product.categories === undefined) {
          product.categories = []
          this.categoryStart = true
          return
        }
        /* Product with categories and finish v for Vue */
        if (index === (product.categories.length - 1)) {
          this.categoryStart = true
        }
        this.categoryType[index] = product.categories.find(value => value.id === category.id) !== undefined
        return this.categoryType[index]
      },
      setActiveValue() {
        this.isActiveText = true
        setTimeout(() => {
          this.isActiveText = false
        }, 1000);
      },
      sendCategory(event, product_id, category_id, index) {
        if (event.target.checked) {
          getAxios(apiProductsCategories.all, 'POST', {product_id, category_id})
            .then(() => {
              this.categoryType[index] = true
              this.setActiveValue()
            })
            .catch(err => {
              handleError(this.$swal, err)
            })
        } else {
          getAxios(apiProductsCategories.all, 'DELETE', {product_id, category_id})
            .then(() => {
              this.categoryType[index] = false
              this.setActiveValue()
            })
            .catch(err => {
              handleError(this.$swal, err)
            })
        }
      },
      subirImagenNutrition(event) {
        let files = event.target.files
        this.formData.delete('nutrition')
        if (files.length) {
          for (let image of files) {
            this.formData.append('nutrition', image, image.name)
          }
        }
      },
      sendData() {
        this.submitForm = true
        this.formDataSendProduct()
        if (this.product.id === '') {
          this.saveData()
        } else {
          this.editData()
        }
      },
      formDataSendProduct() {
        this.formData.delete('id')
        this.formData.append('id', this.product.id)
        this.formData.delete('sku')
        this.formData.append('sku', this.product.sku)
        this.formData.delete('name')
        this.formData.append('name', this.product.name)
        this.formData.delete('description_short')
        this.formData.append('description_short', this.product.description_short)
        this.formData.delete('description_one')
        this.formData.append('description_one', this.product.description_one)
        this.formData.delete('description_two')
        this.formData.append('description_two', this.product.description_two)
        this.formData.delete('preparation')
        this.formData.append('preparation', this.product.preparation)
        this.formData.delete('regular_price')
        this.formData.append('regular_price', Number(this.product.regular_price).toFixed(2))
        this.formData.delete('quantity')
        this.formData.append('quantity', this.product.quantity)
        this.formData.delete('user_id')
        this.formData.append('user_id', JSON.parse(localStorage.getItem('user')).id)
      },
      successRequest(title) {
        successMessage(this.$swal, title)
        this.$store.dispatch('getProducts')
        this.hideModal()
      },
      saveData() {
        getAxios(apiProducts.all, 'POST', this.formData)
          .then(() => {
            console.log('ok')
            this.submitForm = false
            this.successRequest(this.wordEng.created)
          })
          .catch(err => {
            console.log('ok2')
            this.submitForm = false
            handleError(this.$swal, err)
          })
      },
      editData() {
        getAxios(apiProducts.allUpdate, 'POST', this.formData)
          .then(() => {
            this.submitForm = false
            this.successRequest(this.wordEng.edited)
          })
          .catch(err => {
            this.submitForm = false
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
            } else {
              this.submitForm = false
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
            } else {
              this.submitForm = false
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
        this.product = modelProduct.reset()
        if (this.modalType === 'images') {
          const file = document.getElementById("image-product");
          file.value = file.defaultValue;
        }
        if (this.modalType === 'categories') {
          this.$store.dispatch('getProducts')
          this.categoryStart = false
        }
        this.open = false
      },
      formaDate(today) {
        return new Date(today).toLocaleDateString("es-ES")
      }
    },
  }
</script>

<style scoped lang="scss">
  .image-content {
    height: 200px;
    overflow: hidden;
    width: 200px;
  }

  .image-content img {
    width: 100%;
  }

  .category-text:first-child input[type="checkbox"] {
    margin-left: 0 !important;
  }

  input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin-right: 5px;
    margin-bottom: -2px;
    cursor: pointer;

    /* Styling checkbox */
    width: 16px;
    height: 16px;
    background-color: white;
    border: 1px solid #898989;
    border-radius: 2px;
  }

  input[type="checkbox"]:checked {
    background-color: #00CCC3;
    border: none;
  }

  .saved-text {
    span {
      color: #00EE9D;
      font-weight: bold;
      opacity: 0;
      transition: 1s;
    }

    span.transaction {
      opacity: 1;
    }
  }
</style>

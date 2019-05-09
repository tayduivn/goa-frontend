<template>
  <div class="product-detail">
    <SearchComponent/>
    <div class="product-detail-box">
      <div v-if="product && product === 'loading'">
        <h3>Cargando datos...</h3>
      </div>

      <div v-else-if="product && product !== 'empty'">
        <div class="product-box">
          <div class="product-content">

            <div class="product-detail-content">

              <div class="product-images">
                <img v-if="product.images" :src="product.images[0].image" :alt="product.name">
                <slick
                    ref="slick"
                    :options="slickOptions">
                  <div v-for="item in product.images" :key="item.id" class="slick-image-content">
                    <img :src="item.image" :alt="item.name">
                  </div>
                </slick>
              </div>

              <div class="product-info">
                <h3>{{product.name}}</h3>
                <p>{{product.description_short}}</p>
                <div class="info-stars">
                  <img src="../../../assets/img/product-description/star_icon.png" alt="start product">
                  <img src="../../../assets/img/product-description/star_icon.png" alt="start product">
                  <img src="../../../assets/img/product-description/star_icon.png" alt="start product">
                  <img src="../../../assets/img/product-description/star_icon.png" alt="start product">
                  <h6>{{getCountReviews}} Reviews</h6>
                </div>
                <p>{{product.regular_price}}</p>
                <div class="info-quantity">
                  <label for="quantity">Quantity</label>
                  <div>
                    <button @click.prevent="quantityProduct(false)">-</button>
                    <input type="text" id="quantity" v-model="quantityValue" disabled>
                    <button @click.prevent="quantityProduct(true)">+</button>
                  </div>
                </div>
                <button class="global-button green" @click.prevent="saveCart" :disabled="product.quantity <= 0">
                  Buy Now
                </button>
                <div><small v-if="product.quantity <= 0" class="text-danger">Not products in the store</small></div>
                <p>{{product.description_one}}</p>
                <div class="info-preparation">
                  <div>
                    <img src="./../../../assets/img/product-description/icon_licuadora.png" alt="ico licuadora">
                    <p>Preparation</p>
                  </div>
                  <p>{{product.preparation}}</p>
                </div>
              </div>
            </div>

            <div class="product-share">
              <a href="/#">
                <img src="./../../../assets/img/product-description/share_facebook_icon.png" alt="ico facebook">
              </a>
              <a href="/#">
                <img src="./../../../assets/img/product-description/share_twitter_icon.png" alt="ico twitter">
              </a>
              <h3>Share</h3>
            </div>

            <div class="product-description-box">
              <div class="head-content tab">
                <p class="tablinks active" @click.prevent="openTab($event, 'description')">Product Description</p>
                <p class="tablinks" @click.prevent="openTab($event, 'review')">Customer Reviews</p>
              </div>
              <div class="separator"></div>
            </div>

            <div id="description" class="product-description-content tabcontent">
              <div class="description-info">
                {{product.description_two}}
              </div>
              <div class="description-image">
              </div>
            </div>

            <div id="review" class="product-review-content tabcontent">
              <div v-if="product.reviews">
                <div class="review-head">
                  <h3>Customer Reviews</h3>
                  <button @click.prevent="openModal" class="global-button transparent">write a review</button>
                </div>
                <div v-for="review in product.reviews" :key="review.id" class="review-info">
                  <h6>{{product.first_name}} {{product.last_name}}</h6>
                  <div>
                    <img src="../../../assets/img/product-description/star_icon.png" alt="start product"
                         v-for="index in parseInt(review.stars)" :key="index">
                  </div>
                  <h6>{{review.title}}</h6>
                  <span>{{review.message}}</span>
                </div>
              </div>
              <div v-else class="text-center">
                <h5>Not reviews</h5>
              </div>
            </div>
          </div>
        </div>

        <div class="global-separator">
          <div class="line"></div>
          <img src="./../../../assets/img/index/Logo_iso_Separador.png" alt="goa logo">
        </div>

        <div class="products-box">
          <h2>Related Products</h2>
          <div class="content-slick" v-if="productsCategories && productsCategories.length
           && productsCategories !== 'empty' && productsCategories!== 'loading' && productsCategories!== 'error'">
            <slick ref="slick" :options="slickOptions">
              <div v-for="item in productsCategories" :key="item.id" class="slick-product-content">
                <router-link :to="`products-detail/${item.id}`">
                  <img v-if="item.images" :src="item.images[0].image" :alt="item.name">
                  <p>{{item.name}}</p>
                  <p>{{item.regular_price}}</p>
                  <router-link :to="`products-detail/${item.id}`" tag="button"
                               class="global-button transparent pl-4 pr-4">
                    Buy Now
                  </router-link>
                </router-link>
              </div>
            </slick>
          </div>
          <div v-else class="text-center">
            <h5>Not Related Products</h5>
          </div>
        </div>

        <vue-modaltor :visible="open" @hide="hideModal">
          <template slot="close-icon">
            <CloseImageSVG/>
          </template>
          <h3>Review to {{product.name}}</h3>
          <form @submit.prevent="saveData">
            <div class="form-group">
              <label for="title" class="mt-3 mb-3">Title</label>
              <input class="form-control" id="title" type="text" v-model="review.title" required>
            </div>
            <div class="form-group">
              <label for="message" class="mt-3 mb-3">Message</label>
              <textarea class="form-control" id="message" type="text" v-model="review.message" required
                        rows="5"></textarea>
            </div>
            <div class="form-group">
              <label for="stars" class="mt-3 mb-3">Starts</label>
              <select class="form-control width-reset ml-3" name="stars" id="stars" required>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div class="text-right">
              <button type="submit" class="btn-sm btn-primary">Guardar</button>
            </div>
          </form>
        </vue-modaltor>

      </div>

      <div v-else-if="product && product === 'empty'" class="d-flex justify-content-between mb-3">
        <h3>No hay datos registrados</h3>
      </div>
      <div v-else-if="product && product === 'error'">
        <h3>Error recuperando datos</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchComponent from "../../../components/SearchComponent"
  import Slick from 'vue-slick';
  import CloseImageSVG from "../../../components/CloseImageSVG"
  import {modelReviews} from "../../../services/model/model-reviews"
  import {apiCartsProducts, apiReviews, getAxios} from "../../../utils/endpoints"
  import {handleError} from "../../../utils/util"
  import {infoMessage, successMessage} from "../../../utils/handle-message"
  import {modelCartProducts} from "../../../services/model/model-cart-products"

  export default {
    name: 'ProductsDetail',
    components: {SearchComponent, Slick, CloseImageSVG},
    data() {
      return {
        open: false,
        review: modelReviews,
        cartProducts: modelCartProducts,
        quantityValue: 1,
        slickOptions: {
          autoplay: true,
          arrows: true,
          dots: false,
          slidesToShow: 4,
          responsive: [
            {
              breakpoint: 900,
              settings: {
                arrows: false,
                dots: true,
              }
            }
          ]
        },
      }
    },
    beforeUpdate() {
      if (this.$refs.slick) {
        this.$refs.slick.destroy();
      }
    },
    updated() {
      this.$nextTick(function () {
        if (this.$refs.slick) {
          this.$refs.slick.create(this.slickOptions);
        }
      });
    },
    computed: {
      product() {
        return this.$store.getters.getProduct
      },
      productsCategories() {
        return this.$store.getters.getProductsCategories
      },
      getCountReviews() {
        return this.product.reviews ? 0 : 0
      }
    },
    created() {
      this.$store.dispatch('getProduct', `?id=${this.$route.params.id}`)
      this.$store.dispatch('getProductsCategories', `?id=${this.$route.params.id}&category=true&limit=15&order=RAND`)
    },
    methods: {
      saveData() {
        getAxios(apiReviews.all, 'POST', this.review)
          .then(() => {
            successMessage(this.$swal, "Creado")
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      },
      saveCart() {
        this.cartProducts.quantity = this.quantityValue
        this.cartProducts.product_id = this.product.id
        this.cartProducts.cart_id = localStorage.getItem('cartId')
        console.log(JSON.stringify(this.cartProducts))
        getAxios(apiCartsProducts.all, 'POST', this.cartProducts)
          .then(() => {
            successMessage(this.$swal, "Creado")
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      },
      quantityProduct(isPlus) {
        if (isPlus && this.product.quantity <= this.quantityValue) {
          infoMessage(this.$swal, null, 'This is the max in the store')
          return
        }
        if (!isPlus && this.quantityValue <= 1) {
          infoMessage(this.$swal, null, '1 is the minimum')
          return
        }
        this.quantityValue = isPlus ? this.quantityValue + 1 : this.quantityValue - 1
      },
      openModal() {
        this.open = true
      },
      hideModal() {
        this.open = false
        this.review = modelReviews.reset()
      },
      openTab(evt, tabName) {
        let i, tabcontent, tablinks
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        const elementById = document.getElementById(tabName)
        elementById.style.display = elementById.id === 'review' ? "block" : "flex"
        evt.currentTarget.className += " active";
      }
    },
  }
</script>

<style scoped lang="scss">
  .product-detail {
    background-color: white;
  }
</style>

<template>
  <div class="product-detail">
    <SearchComponent/>
    <div class="product-box">
      <div v-if="product && product === 'loading'">
        <h3>Cargando datos...</h3>
      </div>

      <div v-else-if="product && product !== 'empty'">
        <div class="product-content">
          <div class="product-images">
            <img :src="product.images[0]" :alt="product.name">
            <slick
                ref="slick"
                :options="slickOptions">
              <div v-for="item in products" :key="item.id" class="slick-image-content">
                <img :src="item.images[0]" :alt="item.name">
              </div>
            </slick>
          </div>
          <div class="product-info">
            <h3>{{product.name}}</h3>
            <p>{{product.description_short}}</p>
            <p>{{product.regular_price}}</p>
            <label for="quantity"></label>
            <div class="info-quantity">
              <button>-</button>
              <input type="number" id="quantity">
              <button>-</button>
            </div>
            <button class="global-button green">Buy Now</button>
            <p>{{product.description_one}}</p>
            <div class="info-preparation">
              <img src="./../../../assets/img/product-description/icon_licuadora.png" alt="ico licuadora">
              <span>{{product.preparation}}</span>
            </div>
          </div>
        </div>
        <div class="product-share">
          <img src="./../../../assets/img/product-description/share_facebook_icon.png" alt="ico facebook">
          <img src="./../../../assets/img/product-description/share_twitter_icon.png" alt="ico twitter">
          <h3>Share</h3>
        </div>
        <div class="product-description-content">
          <h4 class="active">Product Description</h4>
          <h4>Customer Reviews</h4>
          <div class="product-description">
            <div class="description-info">
              {{product.description_two}}
            </div>
            <img :src="product.nutrition" :alt="product.name">
          </div>
          <div class="product-review">
            <div class="review-head">
              <h3>Customer Reviews</h3>
              <button class="global-button transparent">write a review</button>
            </div>
            <div class="description-info">
              {{product.first_name}} {{product.last_name}}
              {{product.title}}
              {{product.message}}
              <!-- Todo: Starts -->
              <img :src="product.nutrition" :alt="product.name">
            </div>
          </div>
        </div>
        <div class="global-separator">
          <img src="./../../../assets/img/index/Logo_GoA_Representations_img.png" alt="goa logo">
        </div>
        <div class="product-related">
          <h2>Related products</h2>
          <div v-for="item in products" :key="item.id" class="slick-image-content">
            <img :src="item.images[0]" :alt="item.name">
            <p>{{item.name}}</p>
            <p>{{item.regular_price}}</p>
            <button class="global-button transparent">Buy Now</button>
          </div>
        </div>
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

  export default {
    name: 'ProductsDetail',
    components: {SearchComponent, Slick},
    data() {
      return {
        slickOptions: {
          autoplay: true,
          arrows: true,
          dots: false,
          slidesToShow: 1,
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
    },
    created() {
      this.$store.dispatch('getProduct', `?id=${this.$route.params.id}`)
    },
    methods: {
      searchProduct() {
      }
    },
  }
</script>

<style scoped lang="scss">
  .product-detail {
    background-color: white;
  }
</style>

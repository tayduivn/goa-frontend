<template>
  <div class="home">
    <section class="home-sub-head">
      <div class="sub-head-products">
        <img src="./../../assets/img/index/Cacao_Head_1.png" alt="products">
        <img src="./../../assets/img/index/Cacao_Head_1.png" alt="products">
        <img src="./../../assets/img/index/Cacao_Head_1.png" alt="products">
      </div>
      <p>Ready to use in the preparation of our delicious</p>
      <button class="global-button green">buy now</button>
    </section>
    <section class="home-info">
      <p>Import, export and distribution of products.</p>
      <p>(Perishable and not perishable)</p>
      <div class="box-info-image">
        <img src="./../../assets/img/index/Secc1_Img_1.jpg" alt="info 1">
        <img src="./../../assets/img/index/Secc1_Img_2.jpg" alt="info 2">
        <img src="./../../assets/img/index/Secc1_Img_3.jpg" alt="info 3">
      </div>
    </section>
    <div class="global-separator">
      <img src="./../../assets/img/index/Logo_GoA_Representations_img.png" alt="goa logo">
    </div>
    <section class="home-new-products">
      <div class="content-slick" v-if="images && images.length">
        <slick
            ref="slick"
            :options="slickOptions">
          <div v-for="item in products" :key="item.id" class="slick-image-content">
            <img :src="item.images[0]" :alt="item.name">
            <p>{{item.name}}</p>
            <p>{{item.regular_price}}</p>
            <button class="global-button transparent">Buy Now</button>
          </div>
        </slick>
      </div>
    </section>
    <section class="home-about">
      <div class="about-content">
        <div class="about-info">
          <h2>About us</h2>
          <h6>Gardens of America</h6>
          <p>Company of the group that is dedicated to the Import, export and product distribution. (Perishable and not
            perishable) One of the advantages of GOA is that it has a platform complete logistics which allows an
            integral
            development in its operations, having greater control in operations and optimizing costs.</p>
        </div>
        <div class="about-image">
          <img src="./../../assets/img/index/About_us_img.jpg" alt="image about">
        </div>
      </div>
    </section>
    <section class="home-favorites-products">
      <div class="content-slick" v-if="images && images.length">
        <slick
            ref="slick"
            :options="slickOptions">
          <div v-for="item in products" :key="item.id" class="slick-image-content">
            <img :src="item.images[0]" :alt="item.name">
            <p>{{item.name}}</p>
            <p>{{item.regular_price}}</p>
            <button class="global-button transparent">Buy Now</button>
          </div>
        </slick>
      </div>
    </section>
    <section class="home-philosophy">
      <div class="philosophy-box">
        <img src="./../../assets/img/index/Logo_iso_Separador.png" alt="goa logo">
        <h5>Our philosophy</h5>
        <p>Our philosophy is to distribute healthy and high quality food for our final consumers.</p>
      </div>
    </section>
    <section class="home-mission">
      <div class="mission-box">
        <h2>Our Mission</h2>
        <p>Development and marketing of high quality products in the medium term and with the vision to bring products
          with a high nutritional and natural content to the market.</p>
      </div>
    </section>
    <section class="home-representations">
      <div class="representations-box">
        <div class="representations-content">
          <div class="representations-info">
            <h2>Representations</h2>
            <p>GOA, represents several companies in America that can offer a line of products of high demand and also
              specialized products. We also offer advice and management of formalities before governmental entities such
              as FDA, USDA, CBP.</p>
            <p>REPRESENTATIONS: Some to review since what we are looking for is to manage products that identify with
              our
              business vision but have a business area for the management of other categories.</p>
          </div>
          <div class="representations-image">
            <img src="./../../assets/img/index/Logo_iso_Separador.png" alt="goa logo">
          </div>
        </div>
        <img src="./../../assets/img/index/Logo_GoA_Representations_img.png" alt="goa logo">
      </div>
    </section>
  </div>
</template>

<script>
  import Slick from 'vue-slick';

  export default {
    name: "home",
    metaInfo: {
      title: 'Gardens of America',
      titleTemplate: (title) => {
        return `${title} | Inicio`
      }
    },
    components: {Slick},
    data() {
      return {
        open: false,
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
      categories() {
        return this.$store.getters.getProducts
      },
    },
    created() {
      this.$store.dispatch('getProducts')
    },
  };
</script>

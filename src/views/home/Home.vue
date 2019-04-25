<template>
  <div class="homeV">
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <div class="col-md-7 home-header-text">
            <h2 class="mt-5 mb-4">
              clientes encuentran transportistas
            </h2>
            <h2>
              transportistas encuentran clientes
            </h2>
            <h6 class="mt-3">
              Facilitamos los envíos grandes al ayudar a los clientes conectarse directamente con los transportistas
              disponibles.
            </h6>
          </div>
        </div>
      </div>
    </div>

    <div class="home-content col-md-12 p-0">

      <div class="col-md-12 p-0 row home-content-categories">
        <router-link :to="`detail-ship/${category.idcategory}/object`" class="col-md-2 col-sm-6 p-2 text-center"
                     v-for="category in this.categories" :key="category.idcategory">
          <div class="home-categories-image">
            <img class="img-fluid" :src="category.image" :alt="category.name">
          </div>
          <h5>{{category.name}}</h5>
        </router-link>
      </div>

      <div class="home-content-interest">
        <div class="d-flex flex-sm-row flex-column justify-content-between">
          <p class="p-sm-0 p-2">Millones de clientes</p>
          <p class="p-sm-0 p-2">Envíos en todo el país</p>
          <p class="p-sm-0 p-2">Años de experiencia</p>
        </div>
      </div>

      <div class="home-section">
        <div class=" p-4 row">
          <div class="col-md-6 col-sm-12">
            <img src="../../assets/img/home-somos.png" alt="home somos">
          </div>
          <div class="col-md-6 col-sm-12">
            <h4>Quienes Somos</h4>
            <p>Nuestra empresa se fundó a los inicios de 1976 cuando Don Marco Antonio Santis Caceres decidió comprar
              su primer camión, con el que dio inicio a su travesía en el rubro del transporte estos años logro
              posicionar a TSL en el mercado nacional, en base a su misión:</p>
            <div class="text-right mt-4">
              <a @click.prevent="openModal">Seguir leyendo</a>
            </div>
          </div>
        </div>
      </div>

      <div class="home-section">
        <div class=" mt-2 mb-2 p-4 row">
          <div class="col-md-6 col-sm-12">
            <h4>Servicios</h4>
            <ul class="pl-4">
              <li>Transporte de carga general</li>
              <li>Transporte de carga express</li>
              <li>Transporte de carga en frigorífico</li>
              <li>Transporte de carga en sider</li>
              <li>Transporte de carga sobredimensionada y/o de alto tonelaje</li>
            </ul>
            <div class="mt-4">
              <router-link to="ship">Solicitar servicio</router-link>
            </div>
          </div>
          <div class="col-md-6 col-sm-12 text-md-right text-center">
            <img src="../../assets/img/home-somos.png" alt="home somos">
          </div>
        </div>
      </div>

      <div class="p-3 home-section">
        <div class="text-center mb-3">
          <h3>Nuestros camiones</h3>
        </div>
        <div class="content-slick" v-if="images && images.length">
          <slick
              ref="slick"
              :options="slickOptions">
            <div v-for="item in images" :key="item.idimages" class="slick-image-content">
              <img :src="item.image" alt="image slider">
            </div>
          </slick>
        </div>
      </div>
    </div>

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <div class="home-content-somos">
        <h4>Quienes Somos</h4>
        <p>Nuestra empresa se fundó a los inicios de 1976 cuando Don Marco Antonio Santis Caceres decidió comprar
          su primer camión, con el que dio inicio a su travesía en el rubro del transporte estos años logro
          posicionar a TSL
          en el mercado nacional, en base a su misión:</p>
        <p>"Satisfacer las necesidades de transporte y logística de carga terrestre de nuestros clientes,
          transformando
          el conocimiento en valor para proporcionar un servicio de calidad en beneficio de nuestros cliente, y a
          nuestra gente
          proporcionarles estabilidad y la posibilidad de desarrollar sus competencias".</p>
        <p>En todo este tiempo se ha adquirido una experiencia excepcional en el traslado terrestre de todo tipo de
          carga
          a lo largo del país, experiencia que ha sido adquirida gracias a la diversidad de empresas a las cuales
          hemos prestado
          nuestros servicios, lo que nos ha permitido aumentar la capacidad de diversificar nuestros servicios y la
          innovación
          continua de nuestro soporte técnico, logrando un servicio integrado.</p>
        <p>En la actualidad, TSL con su Misión y Valores, "Orientación al cliente, Comunicación abierta y honesta,
          Trabajo
          en equipo, Integridad y Responsabilidad social", ha logrado construir una gran organización, con
          instalaciones
          propias en las cuales existen bodegas de acopio para nuestros clientes, un personal altamente capacitado y
          una
          flota de vehículos de última tecnología, es aquí donde se coloca un nivel extra de preocupación para poder
          mantener una flota renovada, lo que junto a nuestro personal nos permite tener una ventaja competitiva
          frente a nuestra competencia.</p>
        <p>Para el futuro TSL se centra en su Visión "Seguir contando con una infraestructura acorde a las
          exigencias
          del mercado, un personal altamente capacitado y una flota de última tecnología con el fin de ser líder en
          el
          mercado, y estar en continuo crecimiento y mejoramiento de nuestros procesos para poder proporcionar un
          servicio de transporte
          y logística de calidad garantizada a nuestros clientes.</p>
      </div>
    </vue-modaltor>
  </div>
</template>

<script>
  import CloseImageSVG from "../../components/CloseImageSVG"
  import Slick from 'vue-slick';

  export default {
    name: "homeV",
    metaInfo: {
      title: 'TSL',
      titleTemplate: (title) => {
        return `${title} | Inicio`
      }
    },
    components: {CloseImageSVG, Slick},
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
        return this.$store.getters.getCategories
      },
      images() {
        return this.$store.getters.getImages
      }
    },
    created() {
      this.$store.dispatch('getImages')
      this.$store.dispatch('getCategories')
    },
    methods: {
      getServiceByCategory(idCategory) {
        console.log(idCategory)
        this.$store.dispatch('getServicesCategory', idCategory)
        return this.$store.getters.getServicesCategory
      },
      openModal() {
        this.open = true
      },
      hideModal() {
        this.open = false
      },
    }
  };
</script>

<style scoped lang="scss">
  /* Scss Functions */
  %div-adjust {
    margin: 0 auto;
    max-width: 1360px;
  }

  @mixin h4-section-title() {
    margin: 1% 0 5%;
    padding-bottom: 20px;
    border-bottom: 1px solid #ececec;
  }

  .content-slick {
    max-width: 800px;
    margin: 0 auto;

    .slick-image-content {
      height: 300px;
      overflow: hidden;

      img {
        width: 100%;
      }
    }
  }

  /* Modal */
  .home-content-somos {
    p {
      margin-bottom: 3%;
      line-height: 1.4rem;
    }

    h4 {
      @include h4-section-title
    }
  }

  /* Home */
  .home-header-text {
    h2 {
      line-height: 2.8rem;
      text-transform: uppercase;
    }

    h6 {
      line-height: 1.6rem;
    }
  }

  .home-content {
    background-color: white;
    margin: 8% auto 0;
    position: relative;
    padding-top: 100px !important;

    .home-content-categories {
      @extend %div-adjust;
      position: absolute;
      padding: 0 20px !important;
      left: 0;
      right: 0;
      top: -40px;

      .home-categories-image {
        height: 50px;
        overflow: hidden;

        img {
          width: 100%;
        }
      }
    }

    .home-content-interest {
      width: 100%;
      background-color: #25313E;
      padding: 40px 10px;

      div:first-child {
        @extend %div-adjust
      }

      p {
        color: white;
        font-size: 1.4rem;
        margin: 0 5%;
        text-align: center;
      }
    }

    .home-section:nth-of-type(3) {
      background-color: #F4F4F4;
    }

    .home-section:nth-of-type(5) {
      background-color: #F4F4F4;
      padding-bottom: 30px !important;
    }

    .home-section {
      div:first-child {
        @extend %div-adjust
      }

      h4 {
        @include h4-section-title
      }

      p {
        line-height: 1.4rem;
      }

      a {
        border-bottom: 4px solid #00B437;
        font-weight: 600;
        padding-bottom: 10px;
      }

      ul {
        li {
          list-style: circle;
          padding: 5px 0;
        }
      }
    }
  }

  @media screen and (min-width: 1360px) {

  }

  @media screen and (min-width: 1920px) {

  }

  @media screen and (max-width: 1024px) {

  }

  @media screen and (max-width: 700px) {
    .home-content .home-section div[data-v-fae5bece]:first-child {
      margin-bottom: 10%;
    }

    .home-content .home-content-interest {
      padding: 30px 10px;

      p {
        border-bottom: 1px solid white;
      }
    }
  }

  @media screen and (max-width: 400px) {

  }
</style>

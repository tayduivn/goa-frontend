<template>
  <header>
    <div class="header-content">
      <router-link to="/" id="logo"></router-link>
      <nav>
        <a class="scrollLink" href="https://theroom.com.ve/#index-dev-web" onclick="menuResponsive()">
          About us
        </a>
        <a class="scrollLink" href="https://theroom.com.ve/#index-dev-app" onclick="menuResponsive()">
          Store
        </a>
        <a class="scrollLink" href="https://theroom.com.ve/#index-edit-video" onclick="menuResponsive()">
          Our Mission
        </a>
        <a class="scrollLink" href="https://theroom.com.ve/#index-edit-video" onclick="menuResponsive()">
          Representations
        </a>
      </nav>
      <router-link to="/cart" id="cart">
        <span class="number-products">{{notificationCount}}</span>
        <img src="../assets/img/Header/icon_cart.png" alt="cart">
      </router-link>
      <span onclick="openNav()">
        <img src="../assets/img/Header/icon_menu.png" alt="menu profile">
      </span>
    </div>
  </header>
</template>

<script>
  import jQuery from 'jquery'

  export default {
    name: "NavBar",
    computed: {
      user() {
        if (this.$store.getters.getUser !== '') {
          return JSON.parse(this.$store.getters.getUser)
        } else {
          return ''
        }
      },
      levelUser() {
        return this.$store.getters.getLevelUser
      },
      notificationCount() {
        if (this.user !== null && this.user !== undefined && this.user.constructor === Object) {
          const cartsByUser = this.$store.getters.getCartsByUser
          if (cartsByUser !== 'empty' && cartsByUser !== 'error' && cartsByUser !== 'loading') {
            return cartsByUser.products.length
          } else {
            return 0
          }
        } else {
          return 0
        }
      }
    },
    mounted() {
      /* Menu responsive */
      jQuery('nav').before('<div id="smartbutton"></div>');
      const smartButton = jQuery('#smartbutton');
      smartButton.append('<div class="buttonline"></div>');
      smartButton.append('<div class="buttonline"></div>');
      smartButton.append('<div class="buttonline"></div>');

      function menuResponsive() {
        jQuery('nav').animate({height: 'toggle'}, 200);
      }

      smartButton.click(function () {
        menuResponsive()
      });

      /* Scroll */
      jQuery(document).ready(function () {
        jQuery("a.scrollLink").click(function () {
          const linkHref = jQuery(this).attr("href")
          const idElement = linkHref.substr(linkHref.indexOf("#"))
          jQuery('html, body').animate({
            scrollTop: jQuery(idElement).offset().top
          }, 1000);
          return false;
        });
      });
    },
    created() {
      if (this.user !== null && this.user !== undefined && this.user.constructor === Object) {
        this.$store.dispatch('getCartsByUser', `?userId=${this.user.id}&status=current`)
      }
    },
    methods: {
      openNav() {
        this.$parent.openNav()
      },
      validateUser() {
        if (this.user !== null && this.user !== undefined && this.user.constructor === Object) {
          const type = this.user.type === 'Transportista' ? 'Cliente' : this.user.type
          return this.user && this.user.iduser !== '' && type === 'Cliente'
        } else {
          return false
        }
      },
      logout() {
        this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/')
          })
      }
    }
  }
</script>


<style scoped>
  /* Header */
  header {
    background-color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    padding: 10px;
    position: fixed;
    width: 100%;
    z-index: 1000;
  }

  header .header-content {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1360px;
  }

  header nav a {
    color: #646464;
    padding: 10px 15px;
    text-transform: uppercase;
  }

  header nav a:hover {
    color: white;
  }

  header span.number-products {
    background-color: darkred;
    border-radius: 50%;
    font-size: .7rem;
    color: white;
    margin-right: 2%;
    padding: 2px 5px;
  }

  @media screen and (min-width: 1920px) {

  }

  @media screen and (min-width: 1360px) {

  }

  @media screen and (max-width: 1024px) {
    header .header-content {
      max-width: 1024px;
    }
  }

  @media screen and (max-width: 700px) {
    header nav a {
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      display: block;
      padding: 10px;
    }

    header nav a:last-child {
      border-bottom: none;
    }

    header .header-content {
      display: block;
      overflow: hidden;
    }
  }

  @media screen and (max-width: 400px) {
  }

  /* Menu */
  #logo {
    background-image: url('../assets/img/Header/Logo_GoA_Head.png');
    background-repeat: no-repeat;
    background-size: contain;
    float: left;
    height: 40px; /* your logo here! */
    max-width: 280px;
    width: calc(100% - 50px);
  }

  nav {
    flex: none;
    float: right;
  }

  .navitem {
    color: #999;
    font-family: Helvetica;
    font-size: 16px;
    font-weight: bold;
    margin-left: 5px;
    padding: 8px;
    text-decoration: none;
  }

  .navitem:first-child {
    margin-left: 0;
  }

  .navitem:hover {
    color: white;
  }

  #smartbutton {
    border: 1px solid #999;
    border-radius: 6px;
    cursor: pointer;
    display: none;
    float: right;
    height: 32px;
    margin-top: 5px;
    padding: 7px;
    width: 30px;
  }

  .buttonline {
    background-color: #999;
    height: 3px;
    margin-top: 4px;
  }

  .buttonline:first-child {
    margin-top: 0px;
  }

  /* standard menu */
  @media only screen and (min-width: 701px) {
    #smartbutton {
      display: none;
    }

    nav {
      display: inline-block !important;
    }
  }

  /* smart menu */
  @media only screen and (max-width: 700px) {
    #smartbutton {
      display: inline-block;
    }

    nav {
      display: none;
      position: relative;
      top: 5px;
      width: 100%;
    }

    .navitem {
      border-top: 1px solid #999;
      display: block;
      margin: 0;
    }

    .navitem:hover {
      background-color: #333;
    }
  }

</style>

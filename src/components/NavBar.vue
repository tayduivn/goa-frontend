<template>
  <header id="header-home">
    <div class="header-content">
      <router-link to="/" id="logo"></router-link>
      <nav>
        <router-link class="scrollLink" to="/#home-about">About us</router-link>
        <router-link class="scrollLink" to="products">Store</router-link>
        <router-link class="scrollLink" to="/#home-our-mission">Our Mission</router-link>
        <router-link class="scrollLink" to="/#home-representations">Representations</router-link>
      </nav>
      <div class="cart-profile">
        <router-link to="/cart" id="cart">
          <span v-if="notificationCount > 0" class="number-products">{{notificationCount}}</span>
          <img src="../assets/img/Header/icon_cart.png" alt="cart">
        </router-link>
        <a @click.prevent="openNav()"><img src="../assets/img/Header/icon_menu.png" alt="menu profile"></a>
      </div>
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
          const cartsByUser = this.$store.getters.getCartStatus
          if (cartsByUser !== 'empty' && cartsByUser !== 'error' && cartsByUser !== 'loading' && cartsByUser.products) {
            if (cartsByUser.products.length) {
              return cartsByUser.products.length
            } else {
              return 0
            }
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
            scrollTop: jQuery(idElement).offset().top - 100
          }, 1000);
          return false;
        });
      });
    },
    created() {
      if (this.user !== null && this.user !== undefined && this.user.constructor === Object) {
        this.$store.dispatch('getCartStatus', `?userId=${this.user.id}&status=current`)
      }
    },
    methods: {
      openNav() {
        this.$parent.openNav()
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

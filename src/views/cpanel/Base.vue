<template>
  <div class="grid-container">
    <div class="menu-icon">
      <i class="fas fa-bars header__menu"></i>
    </div>

    <header class="header">
      <div class="header__search"></div>
      <div class="header__avatar">
        <div class="dropdown">
          <button @click.prevent="dropdownShow" class="dropbtn"></button>
          <div id="myDropdown" class="dropdown-content">
            <router-link to="/cpanel/admin/profile">Perfil</router-link>
            <a @click.prevent="logout">Salir</a>
          </div>
        </div>
      </div>
    </header>

    <aside class="sidenav">
      <div class="sidenav__close-icon">
        <i class="fas fa-times sidenav__brand-close"></i>
      </div>
      <ul class="sidenav__list">
        <li class="sidenav__list-item">
          <img src="../../assets/logo.png" alt="logo">
        </li>
        <li class="sidenav__list-item">
          <router-link to="/cpanel/admin/client">Clientes</router-link>
        </li>
        <li class="sidenav__list-item">
          <router-link to="/cpanel/admin/products">Productos</router-link>
        </li>
        <li class="sidenav__list-item">
          <router-link to="/cpanel/admin/categories">Categorías</router-link>
        </li>
        <li class="sidenav__list-item">
          <router-link to="/cpanel/admin/reviews">Reviews</router-link>
        </li>
        <li class="sidenav__list-item">
          <router-link to="/cpanel/admin/orders">
            Ordenes
            <span style="display: none" :class="{isActive: (ordersBase > 0)}">{{ordersBase}}</span>
          </router-link>
        </li>
        <li class="sidenav__list-item">
          <router-link to="/cpanel/admin/carts">Carritos</router-link>
        </li>
        <li class="sidenav__list-item">
          <router-link to="/cpanel/admin/users">Usuarios</router-link>
        </li>
      </ul>
    </aside>

    <main class="main p-4">
      <div class="content-main">
        <router-view/>
      </div>
    </main>

    <footer class="footer">
      <div class="footer__copyright">&copy; 2019 TSL</div>
      <div class="footer__signature"></div>
    </footer>
  </div>
</template>
<script>
  import jQuery from "jquery";

  export default {
    name: "Base",
    metaInfo: {
      title: 'TSL cPanel',
      titleTemplate: (title) => {
        return `${title} | Inicio`
      }
    },
    mounted() {
      jQuery('.sub-menu ul').hide();
      jQuery(".sub-menu a").click(function () {
        jQuery(this).parent(".sub-menu").children("ul").slideToggle("100");
        jQuery(this).find(".right").toggleClass("fa-caret-up fa-caret-down");
      });
      const menuIconEl = jQuery('.menu-icon');
      const sidenavEl = jQuery('.sidenav');
      const sidenavCloseEl = jQuery('.sidenav__close-icon');

      // Add and remove provided class names
      function toggleClassName(el, className) {
        if (el.hasClass(className)) {
          el.removeClass(className);
        } else {
          el.addClass(className);
        }
      }

      // Open the side nav on click
      menuIconEl.on('click', function () {
        toggleClassName(sidenavEl, 'active');
      });

      // Close the side nav on click
      sidenavCloseEl.on('click', function () {
        toggleClassName(sidenavEl, 'active');
      });
      // Close the dropdown if the user clicks outside of it
      window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
          const dropDowns = document.getElementsByClassName("dropdown-content")
          let i
          for (i = 0; i < dropDowns.length; i++) {
            const openDropdown = dropDowns[i]
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }
    },
    sockets: {
      connect: function () {
        console.log('socket connected')
      },
      order: function (data) {
        console.log(data)
        this.$store.commit('SET_ACTIVE_ORDER', data.count)
      }
    },
    computed: {
      ordersBase() {
        return this.$store.getters.getActiveOrder
      }
    },
    created() {
      this.$store.dispatch('getActiveOrder', 2)
    },
    methods: {
      dropdownShow() {
        document.getElementById("myDropdown").classList.toggle("show");
      },
      logout() {
        this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/cpanel')
          })
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/styles/dashboard.css";
</style>

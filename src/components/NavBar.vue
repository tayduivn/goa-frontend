<template>
  <nav class="navbar navbar-expand-md pt-0 pb-0 pr-0 pl-0 navbar-light bg-light">
    <router-link class="navbar-brand image" to="/">
      <img src="./../assets/logo.png" alt="tsl logo">
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/#" class="nav-link" data-target="#navbarSupportedContent" data-toggle="collapse">About us</a>
        </li>
        <li class="nav-item">
          <router-link to="/products" class="nav-link" data-target="#navbarSupportedContent" data-toggle="collapse">
            Store
          </router-link>
        </li>
        <li class="nav-item">
          <a href="/#" class="nav-link" data-target="#navbarSupportedContent" data-toggle="collapse">Our mission</a>
        </li>
        <li class="nav-item">
          <a href="/#" class="nav-link" data-target="#navbarSupportedContent" data-toggle="collapse">Representations</a>
        </li>
      </ul>
      <ul v-if="validateUser()" class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarUser" data-toggle="dropdown"
             aria-haspopup="true" aria-expanded="false">
            Usuario
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarUser">
            <router-link :to="{name: 'profileUser'}" class="nav-link">Mi Perfil</router-link>
            <router-link :to="{name: 'profile-message'}" class="nav-link">
              Carrito <span class="notificationDisplay">{{notificationCount}}</span>
            </router-link>
            <router-link :to="{name: 'order-transport'}" class="nav-link">
              Mis solicitudes
            </router-link>
            <a class="nav-link" @click.prevent="logout">Salir</a>
          </div>
        </li>
        <li class="nav-item">
          <router-link
              class="nav-link"
              data-target="#navbarSupportedContent"
              data-toggle="collapse"
              to="/help"
          >Ayuda
          </router-link>
        </li>
      </ul>
      <ul v-else class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link
              class="nav-link d-"
              data-target="#navbarSupportedContent"
              data-toggle="collapse"
              to="/login"
          >Iniciar sesión
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
              class="nav-link"
              data-target="#navbarSupportedContent"
              data-toggle="collapse"
              to="/register"
          >Registrar
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
              class="nav-link"
              data-target="#navbarSupportedContent"
              data-toggle="collapse"
              to="/help"
          >Ayuda
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
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
          return this.$store.getters.getNotificationsStatusRead
        } else {
          return 0
        }
      }
    },
    created() {
      if (this.user !== null && this.user !== undefined && this.user.constructor === Object) {
        this.$store.dispatch('getNotificationsStatusRead', {iduser: this.user.iduser, status: 2})
      }
    },
    methods: {
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


<style scoped lang="scss">
  .navbar {
    background-color: white !important;
    height: 80px;
    position: relative;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    .image {
      height: 100%;
      padding: 0;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .notificationHide {
      display: none;
    }

    .notificationDisplay {
      background-color: #6ccef8;
      border-radius: 50%;
      color: white;
      display: inline-block;
      padding: 5px;
    }

    .nav-item {
      padding: 10px;
    }

    @media (max-width: 768px) {
      .navbar-collapse {
        z-index: 1000;
        background-color: white;
        box-shadow: 0 10px 0 0 rgba(0, 0, 0, 0.2),
        0 5px 0 0 rgba(0, 0, 0, 0.19);
      }

      .dropdown-menu a {
        padding: 10px;
      }
    }
  }
</style>

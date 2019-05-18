<template>
  <div class="base">
    <div v-if="getToken && levelUser && levelUser === 'Cliente'" class="index-sidenav mySidenav">
      <a href="javascript:void(0)" class="closebtn" @click.prevent="closeNav()">&times;</a>
      <a href="javascript:void(0)" @click.prevent="closeNav('profile')">Profile</a>
      <a href="javascript:void(0)" @click.prevent="closeNav('order-client')">History</a>
      <button tag="a" @click.prevent="logout">Logout</button>
    </div>
    <div v-else class="index-sidenav mySidenav">
      <a href="javascript:void(0)" class="closebtn" @click.prevent="closeNav()">&times;</a>
      <a href="javascript:void(0)" @click.prevent="closeNav('login')">Login</a>
      <a href="javascript:void(0)" @click.prevent="closeNav('register')">Register</a>
    </div>
    <div id="main">
      <NavBarC/>
      <main>
        <router-view/>
      </main>
      <FooterC/>
    </div>
  </div>
</template>

<script>
  import NavBarC from '../../components/NavBar.vue'
  import FooterC from '../../components/Footer.vue'

  export default {
    name: 'BaseView',
    components: {
      NavBarC,
      FooterC
    },
    computed: {
      levelUser() {
        return this.$store.getters.getLevelUser;
      },
      getToken() {
        return this.$store.getters.getToken;
      },
    },
    methods: {
      openNav() {
        document.getElementsByClassName("mySidenav")[0].style.width = "250px";
      },
      closeNav(location = '') {
        if (location !== '') this.$router.push(location)
        document.getElementsByClassName("mySidenav")[0].style.width = "0";
      },
      logout() {
        this.$store.dispatch('logout')
          .then(() => {
            this.closeNav()
            this.$router.push('/home')
          })
      }
    },
  }
</script>

<style lang="scss">
  .base {
    main {
      padding-top: 111px;
    }
  }

  @media screen and (min-width: 1360px) {

  }

  @media screen and (min-width: 1920px) {

  }

  @media screen and (max-width: 1024px) {

  }

  @media screen and (max-width: 700px) {
    .base {
      main {
        padding-top: 61px;
      }
    }
  }

  @media screen and (max-width: 400px) {

  }
</style>

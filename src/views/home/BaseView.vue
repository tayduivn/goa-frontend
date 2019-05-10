<template>
  <div class="base">
    <div v-if="isClient" class="index-sidenav mySidenav">
      <a href="javascript:void(0)" class="closebtn" @click.prevent="closeNav()">&times;</a>
      <router-link to="profile" @click.prevent="closeNav()">Profile</router-link>
      <router-link to="order-client" @click.prevent="closeNav()">History</router-link>
      <button tag="a" @click.prevent="logout">Logout</button>
    </div>
    <div v-else id="mySidenav" class="index-sidenav">
      <a href="javascript:void(0)" class="closebtn" @click.prevent="closeNav()">&times;</a>
      <router-link to="login" @click.prevent="closeNav()">Login</router-link>
      <router-link to="register" @click.prevent="closeNav()">Register</router-link>
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
  import {getTokenLevelUser} from "../../utils/util"

  export default {
    name: 'BaseView',
    components: {
      NavBarC,
      FooterC
    },
    data() {
      return {
        isClient: false
      }
    },
    created() {
      let {token, level} = getTokenLevelUser()
      if (token && level === 'Cliente') {
        this.isClient = true
      }
    },
    methods: {
      openNav() {
        document.getElementById("mySidenav").style.width = "250px";
      },
      closeNav() {
        document.getElementById("mySidenav").style.width = "0";
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

<template>
  <div class="base">
    <div id="mySidenav" class="index-sidenav">
      <a href="javascript:void(0)" class="closebtn" @click.prevent="closeNav()">&times;</a>
      <router-link to="profile">Profile</router-link>
      <router-link to="order-client">History</router-link>
      <button tag="a" @click.prevent="logout">Logout</button>
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

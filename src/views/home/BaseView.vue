<template>
  <div class="base">
    <div id="mySidenav" class="index-sidenav">
      <a href="javascript:void(0)" class="closebtn" @click.prevent="closeNav()">&times;</a>
      <router-link to="">Profile</router-link>
      <router-link to="">History</router-link>
      <router-link to="">Logout</router-link>
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
    },
  }
</script>

<style lang="scss">
  .base {
    main {
      padding-top: 111px;
    }
  }
</style>

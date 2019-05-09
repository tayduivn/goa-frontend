<template>
  <div class="base">
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" @click.prevent="closeNav()">&times;</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
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
      padding-top: 61px;
    }
  }
</style>

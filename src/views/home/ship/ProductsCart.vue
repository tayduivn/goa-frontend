<template>
  <div>
    <div class="message-box mb-4 mt-3">
      <h3>Gracias por solicitar el envío</h3>
      <div class="message-info">
        <h4>Espere que nos comuniquemos en las próximas horas</h4>
        <hr>
        <p>Le enviaremos la información de la orden, en la sección de Usuario en la opción
          <router-link :to="{name: 'order-client'}">mis solicitudes</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShipMessage",
    created() {
      this.$parent.setCurrentPath()
    }
  }
</script>

<style scoped lang="scss">
  $color-message: #337670;

  .message-box {
    border: 5px solid $color-message;
    max-width: 600px;
    margin: 0 auto;

    h3 {
      background-color: $color-message;
      color: white;
      padding: 10px 20px;
    }

    .message-info {
      padding: 100px 20px;

      a {
        color: $color-message;
        font-weight: bold;
      }
    }
  }
</style>

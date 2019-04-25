<template>
  <div class="help container mt-3 mb-3">
    <h2 class="text-center p-3 pt-0">Seleccione un tipo de usuario</h2>
    <div class="row register-user-type">
      <button @click="activeClient(true)" class="col-md-6" :class="{ active: isClient}">
        Cliente
      </button>
      <button @click="activeClient(false)" class="col-md-6" :class="{ active: isTransport}">
        Transportista
      </button>
    </div>
    <div v-if="isTransport" class="help-content">
      <p>Usted como transportista tendrá varias opciones como:</p>
      <h6>Edición de perfil</h6>
      <p>Aquí podrá editar sus datos como transportista y algunos datos de información general</p>
      <h6>Mis solicitudes</h6>
      <p>En esta sección podrá ver el estado del envio así como notificar al usuario de lo que suceda</p>
    </div>
    <div v-if="isClient" class="help-content">
      <p>El envío de objetos puede ser complejo. Siga estas instrucciones para tenga una experiencia fluida dentro de la
        plataforma desde el envío del objeto hasta la entrega
      </p>
      <h6>Conozca su envío</h6>
      <p>Haga su mejor esfuerzo para conocer el tamaño, el peso y las necesidades especiales de su envío. Si está
        comprando en línea, normalmente puede obtener esta información del vendedor. Intente asegurarse de que su
        listado incluya los detalles exactos del envío, así como los lugares correctos de recogida y entrega.</p>
      <h6>Tus Mensajes</h6>
      <p>En esta sección usted podrá ver los mensajes por parte de TSL. Este atento a cualquiera de estos mensajes</p>
      <h6>Reserve y hago un deposito</h6>
      <p>Cuando su pedido este en proceso "Deposito Esperando" en la sección de Mis solicitudes. Usted hará el deposito
        con la información suministrada a su correo y entrará en proceso de verificación y luego se realizará el proceso
        de envio.</p>
      <h6>Prepárate para la entrega</h6>
      <p>En la sección de Mis solicitudes usted podrá ver el estado del envio, una vez que su envio llegue tendrá que
        marcar el envio como "Recibido" y concluirá el proceso.</p>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: 'help',
    metaInfo: {
      title: 'TSL',
      titleTemplate: (title) => {
        return `${title} | Ayuda`
      }
    },
    data() {
      return {
        isTransport: false,
        isClient: false,
      }
    },
    methods: {
      activeClient(isClient) {
        this.isClient = isClient
        this.isTransport = !isClient
      }
    },
  }
</script>

<style scoped lang="scss">
  .help {
    background-color: white;
    padding: 0 !important;
    padding-bottom: 20px !important;

    .help-content {
      padding: 20px 20px 0 20px;

      h6 {
        padding: 10px 0;
      }
    }
  }

  .register-user-type {
    margin: 0;

    button {
      border: 1px solid #ececec;
      background-color: #fcfcfc;
      outline: none;
      font-size: 1.4rem;
      padding: 20px;
    }

    button:hover {
      background-color: #f2f2f2;
    }

    button.active {
      background-color: #f3f3f3;
    }
  }
</style>

<template>
  <div class="mt-4">
    <h5>Datos del cliente</h5>
    <table class="table table-custom mt-3 mb-4">
      <tbody>
      <tr>
        <td scope="col" width="250px">Nombre de usuario</td>
        <td>{{order.email}}</td>
      </tr>
      <tr>
        <td scope="col" width="250px">Nombre del Cliente</td>
        <td>{{order.first_name}} {{order.last_name}}</td>
      </tr>
      <tr>
        <td scope="col">Dirección</td>
        <td>{{order.address}}</td>
      </tr>
      <tr>
        <td scope="col">Teléfono</td>
        <td>{{order.phone}}</td>
      </tr>
      </tbody>
    </table>
    <h5>Datos del producto</h5>
    <table class="table table-custom mt-3 mb-4 text-center">
      <tbody>
      <tr>
        <th scope="col" width="10px">Nº</th>
        <th scope="col">Producto</th>
        <th scope="col">Precio</th>
        <th scope="col">Cantidad a Comprar</th>
        <th scope="col">Total</th>
      </tr>
      <tr v-for="(item, index) of order.products" :key="item.id">
        <td>{{++index}}</td>
        <td>{{item.name}}</td>
        <td>{{item.price}}</td>
        <td>{{item.cart_quantity}}</td>
        <td>{{item.cart_quantity * item.price}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    name: 'DataOrderTable',
    props: {
      formaDate: {},
      order: {}
    },
    created() {
      console.log(`order${JSON.stringify(this.order)}`)
    }
  }
</script>

<style scoped lang="scss">
  .table-object tr td img {
    width: 200px;
  }
</style>

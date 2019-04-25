<template>
  <div class="mt-4">
    <h5>Datos del cliente y el envío</h5>
    <table class="table table-custom mt-3 mb-4">
      <tbody>
      <tr>
        <td scope="col" width="250px">Nombre de usuario</td>
        <td>{{order.name}}</td>
      </tr>
      <tr>
        <td scope="col" width="250px">Nombre de Transportista</td>
        <td>{{order.name_truck}}</td>
      </tr>
      <tr>
        <td scope="col">Correo</td>
        <td>{{order.email}}</td>
      </tr>
      <tr>
        <td scope="col">Dirección</td>
        <td>{{order.street}}</td>
      </tr>
      <tr>
        <td scope="col">Teléfono</td>
        <td>{{order.phone}}</td>
      </tr>
      <tr>
        <td scope="col">Origen</td>
        <td>{{order.origin_order}}</td>
      </tr>
      <tr>
        <td scope="col">Destino</td>
        <td>{{order.destination_order}}</td>
      </tr>
      <tr>
        <td scope="col">Máximo tiempo de recogida</td>
        <td>{{order.maximum_delivery_date}}</td>
      </tr>
      <tr>
        <td scope="col">Máximo tiempo de entrega</td>
        <td>{{order.maximum_withdrawal_date}}</td>
      </tr>
      <tr>
        <td scope="col">Mensaje</td>
        <td>{{order.message}}</td>
      </tr>
      <tr>
        <td scope="col">Precio ofertado</td>
        <td>{{order.price}}</td>
      </tr>
      <tr>
        <td scope="col">Fecha de creación</td>
        <td>{{formaDate}}</td>
      </tr>
      </tbody>
    </table>
    <h5>Datos del producto</h5>
    <table class="table-object table table-custom mt-3">
      <tbody>
      <tr>
        <td scope="col" width="250px">Nombre</td>
        <td>{{object.name_object}}</td>
      </tr>
      <tr>
        <td scope="col" width="250px">Image</td>
        <td><img :src="object.image" :alt="object.name"></td>
      </tr>
      <tr>
        <td scope="col">Altura</td>
        <td>{{object.height}}</td>
      </tr>
      <tr>
        <td scope="col">Anchura</td>
        <td>{{object.width}}</td>
      </tr>
      <tr>
        <td scope="col">Peso</td>
        <td>{{object.weight}}</td>
      </tr>
      <tr>
        <td scope="col">Cantidad</td>
        <td>{{object.quantity}}</td>
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
      object: {},
      order: {}
    }
  }
</script>

<style scoped lang="scss">
  .table-object tr td img {
    width: 200px;
  }
</style>

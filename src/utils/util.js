import {infoMessage} from "./handle-message"
import store from "../store/store"
import config from "../config/config"
import router from "../router"

const listState = [
  'Todo',
  'Esperando',
  'Deposito Esperando',
  'Deposito Enviado',
  'Esperando Transportista',
  'Enviando',
  'Enviado',
  'Recibido',
  'Cancelado'
]

function updateOrderOptions(data) {
  return {
    method: 'PUT',
    url: `${config.api_url}/api/admin/order/updatestatus`,
    headers: {
      Authorization: localStorage.token
    },
    data: data
  }
}

function handleError(swal, err, message = '') {
  function validateMessage() {
    if (message === '')
      infoMessage(swal, err, err.response.data.message)
    else
      infoMessage(swal, err, message)
  }

  if (err.response) {
    switch (err.response.status) {
      case 400:
        validateMessage()
        break
      case 401:
        store.dispatch('logout').then(() => router.push('/'))
        break
      case 404:
        validateMessage()
        break
      case 409:
        validateMessage()
        break
      case 500:
        validateMessage()
        break
      default:
        infoMessage(swal, err, 'Error Desconocido')
        break
    }
  } else {
    infoMessage(swal, err, 'Error Desconocido')
  }
}

export {handleError, listState, updateOrderOptions};

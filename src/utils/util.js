import {infoMessage} from "./handle-message"
import store from "../store/store"
import router from "../router"

const listState = [
  'Pendiente',
  'Enviando',
  'Completado',
  'Cancelado',
]

const wordEng = {
  loading: 'Loading...',
  create: 'Create',
  show: 'Show',
  save: 'Save',
  edit: 'Edit',
  delete: 'Delete',
  created: 'Created',
  edited: 'Edited',
  deleted: 'Deleted',
  noData: 'Not data available',
  error: 'Error recovering data',
  upload: 'Upload Image.',
  addImage: 'Add image',
  listUsers: 'List of Users',
  infoUser: 'Information of the user',
  sharePass: 'Never share your password with anyone.',
  enterPass: 'Enter the Password again',
  needAtLeast: 'You need at least one category',
  clickHere: 'Click here',
  youWant: 'You want to update the data?',
  youWantDelete: 'You want to delete your account?',
  profileUpdated: 'Profile updated',
  profileDelete: 'Account delete',
  selectState: 'Select a state',
  forgot: 'Forgot your password?',
  remember: 'Remember me',
  alreadyAccount: 'Do you already have an account?',
  logIn: 'Log in',
  recoverPass: 'Recover password',
  recover: 'Recover',
  sendMessage: 'Message sent to the mail entered',
  /* Base */
  profile: 'Profile',
  logOut: 'Logout',
  products: 'Products',
  categories: 'Categories',
  orders: 'Orders',
  users: 'Users',
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

export {handleError, listState, wordEng};

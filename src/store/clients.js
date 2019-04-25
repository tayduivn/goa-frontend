import axios from 'axios'
import config from "./../config/config";
import {handleError} from "../utils/util"
import swal from 'vue-sweetalert2';

export default {
  state: {
    clients: [],
    client: {},
  },
  mutations: {
    SET_CLIENTS(state, clients) {
      state.clients = clients
    },
    SET_CLIENT(state, client) {
      state.client = client
    }
  },
  getters: {
    getClients: (state) => {
      return state.clients
    },
    getClient: (state) => {
      return state.client
    }
  },
  actions: {
    getClients({commit}) {
      commit('SET_CLIENTS', 'loading')
      axios({
        method: 'GET',
        url: `${config.api_url}/api/admin/user/typeuser/cliente`,
        headers: {
          Authorization: localStorage.token
        },
      })
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_CLIENTS', 'empty')
          } else
            commit('SET_CLIENTS', res.data.data)
        })
        .catch(err => {
          commit('SET_CLIENTS', 'error')
          handleError(swal, err)
        })
    },
  }
}

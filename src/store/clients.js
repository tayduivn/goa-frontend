import {handleError} from "../utils/util"
import swal from 'vue-sweetalert2';
import {apiUsers, getAxios} from "../utils/endpoints"

export default {
  state: {
    clients: [],
  },
  mutations: {
    SET_CLIENTS(state, clients) {
      state.clients = clients
    },
  },
  getters: {
    getClients: (state) => {
      return state.clients
    },
  },
  actions: {
    getClients({commit}) {
      commit('SET_CLIENTS', 'loading')
      getAxios(apiUsers.all, 'GET')
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

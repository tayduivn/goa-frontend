import axios from 'axios'
import config from "./../config/config";
import {handleError} from "../utils/util"
import swal from 'vue-sweetalert2';

export default {
  state: {
    transports: [],
    transport: {},
  },
  mutations: {
    SET_TRANSPORTS(state, transports) {
      state.transports = transports
    },
    SET_TRANSPORT(state, transport) {
      state.transport = transport
    }
  },
  getters: {
    getTransports: (state) => {
      return state.transports
    },
    getTransport: (state) => {
      return state.transport
    },
  },
  actions: {
    getTransports({commit}) {
      commit('SET_TRANSPORTS', 'loading')
      axios({
        method: 'GET',
        url: `${config.api_url}/api/admin/transport/getAll`,
        headers: {
          Authorization: localStorage.token
        },
      })
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_TRANSPORTS', 'empty')
          } else
            commit('SET_TRANSPORTS', res.data.data)
        })
        .catch(err => {
          commit('SET_TRANSPORTS', 'empty')
          handleError(swal, err)
        })
    },
    getTransport({commit}, id) {
      commit('SET_TRANSPORT', 'loading')
      axios({
        method: 'GET',
        url: `${config.api_url}/api/admin/transport/getID/${id}`,
        headers: {
          Authorization: localStorage.token
        },
      })
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_TRANSPORT', 'empty')
          } else
            commit('SET_TRANSPORT', res.data.data)
        })
        .catch(err => {
          commit('SET_TRANSPORT', 'empty')
          handleError(swal, err)
        })
    },
  }
}

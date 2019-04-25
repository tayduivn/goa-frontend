import axios from 'axios'
import config from "./../config/config";
import {handleError} from "../utils/util"
import swal from 'vue-sweetalert2';

export default {
  state: {
    transports: []
  },
  mutations: {
    SET_TRANSPORT_SERVICE(state, transports) {
      state.transports = transports
    }
  },
  getters: {
    getTransportService: (state) => {
      return state.transports
    }
  },
  actions: {
    getTransportService({commit}, idtransport) {
      commit('SET_TRANSPORT_SERVICE', 'loading')
      axios({
        method: 'GET',
        url: `${config.api_url}/api/transportservice/getID/${idtransport}`,
        headers: {
          Authorization: localStorage.token
        },
      })
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_TRANSPORT_SERVICE', 'empty')
          } else
            commit('SET_TRANSPORT_SERVICE', res.data.data)
        })
        .catch(err => {
          commit('SET_TRANSPORT_SERVICE', 'empty')
          handleError(swal, err)
        })
    },
  }
}

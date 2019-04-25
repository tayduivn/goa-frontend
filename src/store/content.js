import axios from 'axios'
import config from "./../config/config";
import {handleError} from "../utils/util"
import swal from "vue-sweetalert2";

export default {
  state: {
    statusContent: [],
  },
  mutations: {
    SET_STATUS_CONTENT(state, statusContent) {
      state.statusContent = statusContent
    },
  },
  getters: {
    getStatusContent: (state) => {
      return state.statusContent
    },
  },
  actions: {
    getStatusContent({commit}, status) {
      commit('SET_STATUS_CONTENT', 'loading')
      axios({
        method: 'GET',
        url: `${config.api_url}/api/content/getStatus/${status}`,
        headers: {
          Authorization: localStorage.token
        },
      })
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_STATUS_CONTENT', 'empty')
          } else
            commit('SET_STATUS_CONTENT', res.data.data)
        })
        .catch(err => {
          commit('SET_STATUS_CONTENT', 'empty')
          handleError(swal, err)
        })
    },
  }
}

import axios from 'axios'
import config from "./../config/config";
import {handleError} from "../utils/util"
import swal from 'vue-sweetalert2';

export default {
  state: {
    services: [],
    servicesCategory: [],
  },
  mutations: {
    SET_SERVICES(state, services) {
      state.services = services
    },
    SET_SERVICES_CATEGORY(state, servicesCategory) {
      state.servicesCategory = servicesCategory
    }
  },
  getters: {
    getServices: (state) => {
      return state.services
    },
    getServicesCategory: (state) => {
      return state.servicesCategory
    }
  },
  actions: {
    getServices({commit}) {
      commit('SET_SERVICES', 'loading')
      axios({
        method: 'GET',
        url: `${config.api_url}/api/public/service/getAll`,
        headers: {
          Authorization: localStorage.token
        },
      })
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_SERVICES', 'empty')
          } else
            commit('SET_SERVICES', res.data.data)
        })
        .catch(err => {
          commit('SET_SERVICES', 'empty')
          handleError(swal, err)
        })
    },
    getServicesCategory({commit}, idcategory) {
      commit('SET_SERVICES_CATEGORY', 'loading')
      axios({
        method: 'GET',
        url: `${config.api_url}/api/public/service/getAllByCategory/${idcategory}`,
        headers: {
          Authorization: localStorage.token
        },
      })
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_SERVICES_CATEGORY', 'empty')
          } else
            commit('SET_SERVICES_CATEGORY', res.data.data)
        })
        .catch(err => {
          commit('SET_SERVICES_CATEGORY', 'empty')
          handleError(swal, err)
        })
    },
  }
}

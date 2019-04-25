import axios from 'axios'
import config from "./../config/config";
import {handleError} from "../utils/util"
import swal from 'vue-sweetalert2';

export default {
  state: {
    images: [],
  },
  mutations: {
    SET_IMAGES(state, images) {
      state.images = images
    },
  },
  getters: {
    getImages: (state) => {
      return state.images
    },
  },
  actions: {
    getImages({commit}) {
      commit('SET_IMAGES', 'loading')
      axios({
        method: 'GET',
        url: `${config.api_url}/api/public/images/getAll`,
        headers: {
          Authorization: localStorage.token
        },
      })
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_IMAGES', 'empty')
          } else
            commit('SET_IMAGES', res.data.data)
        })
        .catch(err => {
          commit('SET_IMAGES', 'empty')
          handleError(swal, err)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  }
}

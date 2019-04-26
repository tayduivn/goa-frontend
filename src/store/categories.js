import {handleError} from "../utils/util"
import swal from 'vue-sweetalert2';
import {apiCategories, getAxios} from "../utils/endpoints"

export default {
  state: {
    categories: [],
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
  },
  getters: {
    getCategories: (state) => {
      return state.categories
    },
  },
  actions: {
    getCategories({commit}) {
      commit('SET_CATEGORIES', 'loading')
      getAxios(apiCategories.allPublic, 'GET')
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_CATEGORIES', 'empty')
          } else
            commit('SET_CATEGORIES', res.data.data)
        })
        .catch(err => {
          commit('SET_CATEGORIES', 'empty')
          handleError(swal, err)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  }
}

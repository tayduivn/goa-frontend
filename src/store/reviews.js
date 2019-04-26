import {handleError} from "../utils/util"
import swal from 'vue-sweetalert2';
import {apiReviews, getAxios} from "../utils/endpoints"

export default {
  state: {
    reviews: [],
  },
  mutations: {
    SET_REVIEWS(state, reviews) {
      state.reviews = reviews
    },
  },
  getters: {
    getReviews: (state) => {
      return state.reviews
    },
  },
  actions: {
    getReviews({commit}) {
      commit('SET_REVIEWS', 'loading')
      getAxios(apiReviews.allPublic, 'GET')
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_REVIEWS', 'empty')
          } else
            commit('SET_REVIEWS', res.data.data)
        })
        .catch(err => {
          commit('SET_REVIEWS', 'empty')
          handleError(swal, err)
        })
    },
  }
}

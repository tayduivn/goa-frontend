import {handleError} from "../utils/util"
import swal from 'vue-sweetalert2';
import {apiCategories, apiEmails, getAxios} from "../utils/endpoints"

export default {
  state: {
    emails: [],
  },
  mutations: {
    SET_EMAILS(state, emails) {
      state.emails = emails
    },
  },
  getters: {
    getEmails: (state) => {
      return state.emails
    },
  },
  actions: {
    getEmails({commit}) {
      commit('SET_EMAILS', 'loading')
      getAxios(apiEmails.all, 'GET')
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_EMAILS', 'empty')
          } else {
            commit('SET_EMAILS', res.data.data)
          }
        })
        .catch(err => {
          commit('SET_EMAILS', 'empty')
          handleError(swal, err)
        })
    },
  }
}

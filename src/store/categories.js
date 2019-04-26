import axios from 'axios'
import config from "./../config/config";
import {handleError} from "../utils/util"
import swal from 'vue-sweetalert2';
import {apiCategories} from "../utils/endpoints"

export default {
  state: {
    categories: [],
    category: {},
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    SET_CATEGORY(state, category) {
      state.category = category
    },
  },
  getters: {
    getCategories: (state) => {
      return state.categories
    },
    getCategory: (state) => {
      return state.category
    },
  },
  actions: {
    getCategories({commit}) {
      commit('SET_CATEGORIES', 'loading')
      axios({
        method: 'GET',
        url: `${apiCategories.allPublic}`,
        headers: {
          Authorization: localStorage.token
        },
      })
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
    getCategory({commit}, idCategory) {
      commit('SET_CATEGORY', 'loading')
      axios({
        method: 'GET',
        url: `${config.api_url}/api/public/category/getID/${idCategory}`,
        headers: {
          Authorization: localStorage.token
        },
      })
        .then(res => {
          localStorage.setItem('idCategory', idCategory)
          if (res.data.data.length === 0) {
            commit('SET_CATEGORY', 'empty')
          } else
            commit('SET_CATEGORY', res.data.data)
        })
        .catch(err => {
          commit('SET_CATEGORY', 'empty')
          handleError(swal, err)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  }
}

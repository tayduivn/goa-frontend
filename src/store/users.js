import axios from 'axios'
import {handleError} from "../utils/util"
import swal from 'vue-sweetalert2';
import {apiUsers, getAxios} from "../utils/endpoints"

export default {
  state: {
    token: false,
    user: '',
    users: [],
    levelUser: "",
  },
  getters: {
    getUsers: state => state.users,
    getUser: state => state.user,
    getLevelUser: state => state.levelUser,
    getToken: state => !!state.token
  },
  mutations: {
    AUTH_SUCCESS(state, token) {
      state.token = token
    },
    SET_USER(state, user) {
      state.user = user
      if (user !== null)
        state.levelUser = JSON.parse(user).type
    },
    SET_USERS(state, users) {
      state.users = users
    },
    logout(state) {
      state.token = false
      state.user = ''
      state.levelUser = ''
    },
  },
  actions: {
    getUsers({commit}, query = '') {
      commit('SET_USERS', 'loading')
      getAxios(`${apiUsers.all}${query}`, 'GET')
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_USERS', 'empty')
          } else
            commit('SET_USERS', res.data.data)
        })
        .catch(err => {
          commit('SET_USERS', 'error')
          handleError(swal, err)
        })
    },
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        getAxios(apiUsers.login, 'POST', user)
          .then(resp => {
            if (resp.data.data.user.name === user.type) {
              const token = resp.data.data.token
              const user = JSON.stringify(resp.data.data.user)
              localStorage.token = `Bearer ${token}`
              localStorage.setItem('user', user)
              axios.defaults.headers.common['Authorization'] = token
              commit('AUTH_SUCCESS', token)
              commit('SET_USER', user)
              resolve(resp)
            } else {
              resolve("Este usuario no tiene permisos")
            }
          })
          .catch(err => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            reject(err)
          })
      })
    },
    logout({commit}) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.token = ''
        localStorage.removeItem('user')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  }
}

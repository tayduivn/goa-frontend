import axios from 'axios'
import config from "./../config/config";
import {handleError} from "../utils/util"
import swal from 'vue-sweetalert2';

export default {
  state: {
    token: false,
    user: '',
    profile: {},
    users: [],
    levelUser: "",
  },
  getters: {
    getUsers: state => state.users,
    getProfile: state => state.profile,
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
    SET_PROFILE(state, profile) {
      state.profile = profile
    },
    logout(state) {
      state.token = false
      state.user = ''
      state.levelUser = ''
    },
  },
  actions: {
    getProfile({commit}, idUser) {
      commit('SET_PROFILE', 'loading')
      axios({
        method: 'GET',
        url: `${config.api_url}/api/user/profile/${idUser}`,
        headers: {
          Authorization: localStorage.token
        },
      })
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_PROFILE', 'empty')
          } else
            commit('SET_PROFILE', res.data.data)
        })
        .catch(err => {
          commit('SET_PROFILE', 'error')
          handleError(swal, err)
        })
    },
    getUsers({commit}) {
      commit('SET_USERS', 'loading')
      axios({
        method: 'GET',
        url: `${config.api_url}/api/admin/user/typeuser/administrador`,
        headers: {
          Authorization: localStorage.token
        },
      })
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
        axios({
          method: 'POST',
          url: `${config.api_url}/api/public/user/login`,
          data: user
        })
          .then(resp => {
            const type = resp.data.data.user.type === 'Transportista' ? 'Cliente' : resp.data.data.user.type
            if (type === user.type) {
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

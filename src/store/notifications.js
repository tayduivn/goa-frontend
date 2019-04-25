import axios from 'axios'
import config from "./../config/config";
import {handleError} from "../utils/util"
import swal from 'vue-sweetalert2';

export default {
  state: {
    notifications: [],
    notificationsWithoutRead: 0,
  },
  mutations: {
    SET_NOTIFICATIONS(state, notifications) {
      state.notifications = notifications
    },
    SET_NOTIFICATIONS_WITHOUT_READ(state, notificationsWithoutRead) {
      state.notificationsWithoutRead = notificationsWithoutRead
    },
  },
  getters: {
    getNotifications: (state) => {
      return state.notifications
    },
    getNotificationsStatusRead: (state) => {
      return state.notificationsWithoutRead
    },
  },
  actions: {
    getNotifications({commit}, idUser) {
      commit('SET_NOTIFICATIONS', 'loading')
      axios({
        method: 'GET',
        url: `${config.api_url}/api/messagenotification/getMessageByUser/${idUser}`,
        headers: {
          Authorization: localStorage.token
        },
      })
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_NOTIFICATIONS', 'empty')
          } else
            commit('SET_NOTIFICATIONS', res.data.data)
        })
        .catch(err => {
          commit('SET_NOTIFICATIONS', 'empty')
          handleError(swal, err)
        })
    },
    getNotificationsStatusRead({commit}, model) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `${config.api_url}/api/messagenotification/getMessageByUserStatusRead/${model.iduser}/${model.status}`,
          headers: {
            Authorization: localStorage.token
          },
        })
          .then(res => {
            if (res.data.data.body.length !== 0) {
              commit('SET_NOTIFICATIONS', res.data.data.body)
            } else {
              commit('SET_NOTIFICATIONS', 'empty')
            }
            if (model.status === 2) {
              const count = res.data.data.body.length !== 0 ? res.data.data.count : 0
              commit('SET_NOTIFICATIONS_WITHOUT_READ', count)
              resolve(count)
            }
          })
          .catch(err => {
            commit('SET_NOTIFICATIONS', 'empty')
            handleError(swal, err)
            reject(err)
          })
      })
    }
  }
}

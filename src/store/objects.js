export default {
  state: {
    object: {},
    fileImage: []
  },
  mutations: {
    SET_ORDER_OBJECT(state, object) {
      state.object = object
    },
    SET_ORDER_FILE_IMAGE(state, fileImage) {
      state.fileImage = fileImage
    },
  },
  getters: {
    getObject: (state) => {
      return state.object
    },
    getFileImage: (state) => {
      return state.fileImage
    },
  },
  actions: {
    setOrderObject({commit}, object) {
      commit('SET_ORDER_OBJECT', object)
    },
    setOrderFileImage({commit}, files) {
      commit('SET_ORDER_FILE_IMAGE', files)
    },
  }
}
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

export const actions = {
  showModal({ commit, state }, item) {
    commit('SET_MODAL', {
      show: true,
      item: item || JSON.parse(JSON.stringify(state.modalItemNew))
    })
  },

  hideModal({ commit }) {
    commit('SET_MODAL', {
      show: false,
      item: {}
    })
  },

  getServices({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .get('/api/service')
        .then(response => {
          commit('SET_SERVICES', response.data)
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  getServiceByID(_, id) {
    return new Promise((resolve, reject) => {
      api
        .get('/api/service/' + id)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  serviceCreate({ commit }, item) {
    return new Promise((resolve, reject) => {
      api
        .post('/api/service', item)
        .then(response => {
          commit('ADD_SERVICE', response.data)
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  serviceUpdate({ commit }, item) {
    delete item.createdAt
    delete item.updatedAt

    return new Promise((resolve, reject) => {
      api
        .put('/api/service/' + item.id, item)
        .then(response => {
          commit('UPDATE_SERVICE', response.data)
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  serviceDelete({ commit }, item) {
    return new Promise((resolve, reject) => {
      api
        .delete('/api/service/' + item.id)
        .then(() => {
          commit('DELETE_SERVICE', item.id)
          resolve(item)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  /*
    Ordering and filtering
  */
  sort({ commit }, options) {
    commit('SET_ORDER_OPTIONS', options)
    commit('SET_ORDER')
  },

  setSearchFilter({ commit }, value) {
    commit('SET_FILTER_SEARCH', value)
  },

  setOwnerFilter({ commit }, value) {
    commit('SET_FILTER_OWNER', value)
  },

  setStatusFilter({ commit }, value) {
    commit('SET_FILTER_STATUS', value)
  }
}

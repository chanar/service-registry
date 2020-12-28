import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'

export default {
  state: {
    serviceList: [],
    showModal: false,
    modalItem: {},
    modalItemNew: {
      new: true,
      active: true,
      owner: 'admin'
    },
    sortValue: 'name',
    sortDirection: 'asc',
    filters: {
      search: '',
      owner: 'all',
      status: 'all'
    }
  },
  mutations,
  getters,
  actions
}

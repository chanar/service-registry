export const mutations = {
  SET_MODAL(state, modal) {
    state.showModal = modal.show
    state.modalItem = modal.item
  },

  SET_MODAL_ITEM(state, item) {
    state.modalItem = item
  },

  SET_SERVICES(state, items) {
    state.serviceList = items
  },

  ADD_SERVICE(state, item) {
    state.serviceList.push(item)
  },

  UPDATE_SERVICE(state, item) {
    const index = state.serviceList.findIndex(i => i.id === item.id)
    Object.assign(state.serviceList[index], item)
  },

  DELETE_SERVICE(state, id) {
    const index = state.serviceList.findIndex(i => i.id === id)
    state.serviceList.splice(index, 1)
  },

  /*
    Ordering and filtering
  */
  SET_ORDER_OPTIONS(state, options) {
    if (!options.keep) {
      if (state.sortValue == options.column) {
        if (state.sortDirection == 'asc') {
          state.sortDirection = 'desc'
        } else {
          state.sortDirection = 'asc'
        }
      }

      state.sortValue = options.column
    }
  },

  SET_ORDER(state) {
    let localServiceList = this.state.serviceList

    // Toggle between ascending and descending ordering
    localServiceList.sort(function(a, b) {
      if (a[state.sortValue] < b[state.sortValue]) {
        return state.sortDirection === 'asc' ? -1 : 1
      }
      if (a[state.sortValue] > b[state.sortValue]) {
        return state.sortDirection === 'asc' ? 1 : -1
      }

      // column values match
      return 0
    })

    // For status column, reverse the sort
    if (state.sortValue == 'active') {
      localServiceList.reverse()
    }

    state.serviceList = localServiceList
  },

  SET_FILTER_SEARCH(state, value) {
    state.filters.search = value
  },

  SET_FILTER_OWNER(state, value) {
    state.filters.owner = value
  },

  SET_FILTER_STATUS(state, value) {
    state.filters.status = value
  }
}

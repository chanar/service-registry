export const getters = {
  filteredList: state => {
    const filtered = state.serviceList.filter(row => {
      const name = row.name.toString().toLowerCase()
      const owner = row.owner.toString().toLowerCase()

      const searchTerm = state.filters.search.toLowerCase()
      const searchOwner = state.filters.owner.toLowerCase()
      let status =
        state.filters.status == 'all'
          ? 'all'
          : state.filters.status == 'active'
          ? true
          : false

      return (
        name.includes(searchTerm) &&
        (state.filters.owner === 'all' ? true : owner.includes(searchOwner)) &&
        (status == 'all' || status == row.active)
      )
    })

    return filtered
  },

  filters: state => {
    return state.filters
  },

  getSearchFilter: state => {
    return state.filters.search
  },

  getOwnerFilter: state => {
    return state.filters.owner
  },

  getStatusFilter: state => {
    return state.filters.status
  },

  getSortValue: state => {
    return state.sortValue
  }
}

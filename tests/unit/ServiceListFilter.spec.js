import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

import ServiceListFilter from '@/components/serviceListFilter'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ServiceListFilter.vue', () => {
  let actions
  let getters
  let state
  let store

  beforeEach(() => {
    actions = {
      setSearchFilter: jest.fn(),
      setOwnerFilter: jest.fn(),
      setStatusFilter: jest.fn()
    }

    getters = {
      getSearchFilter: jest.fn(),
      getOwnerFilter: jest.fn(),
      getStatusFilter: jest.fn()
    }

    state = {}

    store = new Vuex.Store({
      state,
      actions,
      getters
    })
  })

  it('calls get/set searchFilter function when search input value changes', () => {
    const wrapper = shallowMount(ServiceListFilter, { store, localVue })
    const searchInput = wrapper.find('input#search')
    searchInput.setValue('a')
    searchInput.trigger('change')

    expect(actions.setSearchFilter).toHaveBeenCalled()
    expect(getters.getSearchFilter).toHaveBeenCalled()
  })

  it('calls get/set ownerFilter function when owner changes', async () => {
    const wrapper = shallowMount(ServiceListFilter, { store, localVue })
    const options = wrapper.find('select#owner').findAll('option')

    await options.at(1).setSelected()

    expect(actions.setOwnerFilter).toHaveBeenCalled()
    expect(getters.getOwnerFilter).toHaveBeenCalled()
  })

  it('calls get/set statusFilter function when status changes', async () => {
    const wrapper = shallowMount(ServiceListFilter, { store, localVue })
    const options = wrapper.find('select#status').findAll('option')

    await options.at(1).setSelected()

    expect(actions.setStatusFilter).toHaveBeenCalled()
    expect(getters.getStatusFilter).toHaveBeenCalled()
  })
})

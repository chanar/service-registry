import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

import ServiceList from '@/components/serviceList'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ServiceList.vue', () => {
  let actions
  let getters
  let state
  let store

  beforeEach(() => {
    actions = {
      getServices: jest.fn(),
      getServiceByID: jest.fn(),
      sort: jest.fn()
    }

    getters = {
      getSortValue: jest.fn(),
      filteredList: jest.fn()
    }

    state = {}

    store = new Vuex.Store({
      state,
      actions,
      getters
    })
  })

  it('should get services on component load', () => {
    shallowMount(ServiceList, { store, localVue })
    expect(actions.getServices).toHaveBeenCalled()
  })

  it('should get service by ID when clicking on edit', async () => {
    const wrapper = shallowMount(ServiceList, { store, localVue })

    const tableHeaderSortButton = wrapper.find('table thead tr th:first-child')
    tableHeaderSortButton.trigger('click')

    expect(actions.sort).toHaveBeenCalled()
  })
})

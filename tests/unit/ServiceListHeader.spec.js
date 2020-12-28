import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

import ServiceListHeader from '@/components/serviceListHeader'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ServiceListHeader.vue', () => {
  let actions
  let state
  let store

  beforeEach(() => {
    actions = {
      showModal: jest.fn()
    }

    state = {}

    store = new Vuex.Store({
      state,
      actions
    })
  })

  it('calls showModal function when clicks on create service button', () => {
    const wrapper = shallowMount(ServiceListHeader, { store, localVue })
    const button = wrapper.find('button#service-create-button')
    button.trigger('click')

    expect(actions.showModal).toHaveBeenCalled()
  })
})

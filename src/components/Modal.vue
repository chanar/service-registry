<template>
  <div
    v-if="showModal"
    class="service-modal fixed z-10 inset-0 overflow-y-auto"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white">
          <div class="sm:flex sm:items-start">
            <div class="text-left w-full">
              <div
                id="modal-headline"
                class="flex border-b border-cool-gray-200 p-4"
              >
                <div class="flex items-center flex-1">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    {{
                      modalItem.new ? 'Create a service' : 'Update a service'
                    }}
                  </h3>
                </div>
                <div
                  @click="hideModal()"
                  class="cursor-pointer flex justify-center items-center w-8 h-8 text-gray-500"
                >
                  <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <div class="p-8">
                <dl
                  v-if="!modalItem.new"
                  class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 mb-5"
                >
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Created at
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ modalItem.createdAt }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Updated at
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ modalItem.updatedAt }}
                    </dd>
                  </div>
                </dl>
                <form name="service" class="pb-5">
                  <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                      <label
                        for="name"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Service name
                      </label>
                      <div class="mt-1">
                        <input
                          v-model="modalItem.name"
                          type="text"
                          name="name"
                          id="name"
                          autocomplete="given-name"
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-4">
                      <label
                        for="owner"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Service owner
                      </label>
                      <div class="mt-1">
                        <select
                          v-model="modalItem.owner"
                          id="owner"
                          name="owner"
                          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option selected value="admin">admin</option>
                          <option value="user1">user1</option>
                          <option value="user2">user2</option>
                        </select>
                      </div>
                    </div>

                    <div class="sm:col-span-6">
                      <label
                        for="description"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Service description
                      </label>
                      <div class="mt-1">
                        <textarea
                          v-model="modalItem.description"
                          id="description"
                          name="description"
                          rows="3"
                          class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                        ></textarea>
                      </div>
                    </div>

                    <div class="sm:col-span-4">
                      <label
                        for="status"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Service status ({{
                          modalItem.active ? 'Active' : 'Inactive'
                        }})
                      </label>
                      <div class="mt-2">
                        <button
                          @click="setStatus()"
                          id="status"
                          :class="{
                            'bg-indigo-600': modalItem.active,
                            'bg-gray-200': !modalItem.active
                          }"
                          type="button"
                          aria-pressed="false"
                          class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <span
                            :class="{
                              'translate-x-5': modalItem.active,
                              'translate-x-0': !modalItem.active
                            }"
                            aria-hidden="true"
                            class="inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                          ></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                <div v-if="error" class="rounded-md bg-red-50 p-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <!-- Heroicon name: x-circle -->
                      <svg
                        class="h-5 w-5 text-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-red-800">
                        {{ error.message }}
                      </h3>
                      <div class="mt-2 text-sm text-red-700">
                        <ul class="list-disc pl-5 space-y-1">
                          <li v-for="(err, index) in error.errors" :key="index">
                            {{ err.message }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <div class="flex-1 text-right">
            <button
              @click="serviceAction()"
              id="create-update"
              type="button"
              class="w-full text-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {{ modalItem.new ? 'Create' : 'Update' }}
            </button>
          </div>
          <div v-if="!modalItem.new" class="flex-1">
            <button
              @click="serviceAction('delete')"
              id="delete"
              type="button"
              class="mt-3 w-full text-center justify-left px-4 py-2 text-base font-medium text-red-700 hover:underline focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      error: null
    }
  },

  computed: {
    showModal() {
      return this.$store.state.showModal
    },

    modalItem() {
      return this.$store.state.modalItem
    }
  },

  methods: {
    hideModal() {
      this.error = null
      this.$store.dispatch('hideModal')
    },

    setStatus() {
      this.modalItem.active = !this.modalItem.active
    },

    isValidServiceForm() {
      const error = {
        message: `Service cannot be ${
          this.modalItem.new ? 'created' : 'updated'
        }.`,
        errors: []
      }

      if (!this.modalItem.name) {
        error.errors.push({
          message: 'Service name is required.'
        })
      }

      if (!this.modalItem.description) {
        error.errors.push({
          message: 'Service description is required.'
        })
      }

      if (error.errors.length) {
        this.error = error
        return false
      }

      this.error = null

      return true
    },

    serviceAction(action) {
      // If action is not delete
      if (!action) {
        action = this.modalItem.new ? 'create' : 'update'
      }

      // Send service action
      // serviceCreate / serviceUpdate / serviceDelete
      if (this.isValidServiceForm()) {
        this.$store
          .dispatch(this.getServiceActionName(action), this.modalItem)
          .then(() => {
            this.error = null
            this.$store.dispatch('hideModal')
            this.$store.dispatch('sort', {
              column: '',
              keep: true
            })
          })
          .catch(err => {
            this.error = err
          })
      }
    },

    getServiceActionName(action) {
      return 'service' + action.charAt(0).toUpperCase() + action.slice(1)
    }
  }
}
</script>

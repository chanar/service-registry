<template>
  <div class="bg-white mb-5 md:w-2/3">
    <div class="grid grid-cols-6 gap-6">
      <div class="col-span-6 sm:col-span-6 md:col-span-2">
        <label for="search" class="pl-1 block text-sm font-medium text-gray-700"
          >Search</label
        >
        <input
          v-model="search"
          type="text"
          name="search"
          id="search"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div class="col-span-6 sm:col-span-3 md:col-span-2">
        <label for="owner" class="pl-1 block text-sm font-medium text-gray-700"
          >Owner</label
        >
        <select
          v-model="owner"
          id="owner"
          name="owner"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option selected value="all">All</option>
          <option value="admin">admin</option>
          <option value="user1">user1</option>
          <option value="user2">user2</option>
        </select>
      </div>

      <div class="col-span-6 sm:col-span-3 md:col-span-2">
        <label for="status" class="pl-1 block text-sm font-medium text-gray-700"
          >Status</label
        >
        <select
          v-model="status"
          id="status"
          name="status"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option selected value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ServiceListFilter',
  computed: {
    search: {
      get() {
        return this.getSearchFilter()
      },
      set(search) {
        return this.setSearchFilter(search)
      }
    },

    owner: {
      get() {
        return this.getOwnerFilter()
      },
      set(owner) {
        return this.setOwnerFilter(owner)
      }
    },

    status: {
      get() {
        return this.getStatusFilter()
      },
      set(status) {
        return this.setStatusFilter(status)
      }
    }
  },

  methods: {
    ...mapActions(['setSearchFilter', 'setOwnerFilter', 'setStatusFilter']),
    ...mapGetters(['getSearchFilter', 'getOwnerFilter', 'getStatusFilter'])
  }
}
</script>

<template>
  <div class="flex flex-col">
    <ServiceListFilter />
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table id="service-list" class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  @click="sort('name')"
                  scope="col"
                  :class="getStateClass('name')"
                  class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                >
                  Service name
                </th>
                <th
                  @click="sort('owner')"
                  scope="col"
                  :class="getStateClass('owner')"
                  class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                >
                  Owner
                </th>
                <th
                  @click="sort('createdAt')"
                  scope="col"
                  :class="getStateClass('createdAt')"
                  class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                >
                  Created at
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Description
                </th>
                <th
                  @click="sort('active')"
                  scope="col"
                  :class="getStateClass('active')"
                  class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                >
                  Status
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="service in filteredList" :key="service.id">
                <td class="px-6 py-4 whitespace-normal text-sm text-gray-900">
                  {{ service.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ service.owner }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ service.createdAt }}
                </td>
                <td class="px-6 py-4 whitespace-normal text-sm text-gray-900">
                  {{ service.description | truncate(70) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span
                    :class="{
                      'bg-green-100 text-green-800': service.active,
                      'bg-gray-100 text-gray-800': !service.active
                    }"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  >
                    {{ service.active ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <a
                    @click="editService(service.id)"
                    href="#"
                    class="edit-service text-indigo-600 hover:text-indigo-900"
                    >Edit</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ServiceListFilter from '@/components/ServiceListFilter.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'ServiceList',

  components: {
    ServiceListFilter
  },

  data() {
    return {}
  },

  created() {},

  mounted() {
    // On page load receive all services and trigger initial sort
    this.$store.dispatch('getServices').then(() => {
      this.sort('name', true)
    })
  },

  computed: {
    ...mapGetters(['filteredList', 'getSortValue'])
  },

  methods: {
    editService(id) {
      // Opens modal but first requests service by id
      this.$store.dispatch('getServiceByID', id).then(item => {
        this.$store.dispatch('showModal', item)
      })
    },

    sort(column, keep) {
      this.$store.dispatch('sort', { column, keep })
    },

    getStateClass(column) {
      return {
        'text-gray-500': this.getSortValue != column,
        'text-indigo-500 font-semibold': this.getSortValue == column
      }
    }
  },

  filters: {
    truncate: function(value, size) {
      if (!value) return ''
      value = value.toString()

      if (value.length <= size) {
        return value
      }
      return value.substr(0, size) + '...'
    }
  }
}
</script>

<style scoped></style>

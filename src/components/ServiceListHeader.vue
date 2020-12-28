<template>
  <div class="bg-gray-800 pb-32">
    <header class="py-10">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <h1 class="text-3xl font-bold text-white">
            Service registry
          </h1>
          <div class="mt-3 sm:mt-0 sm:ml-4">
            <button
              @click="openModal()"
              type="button"
              id="service-create-button"
              class="inline-flex items-center px-4 py-2 border border-gray-400 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create service
            </button>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'ServiceListHeader',
  data() {
    return {}
  },

  methods: {
    openModal() {
      this.$store.dispatch('showModal')
    }
  }
}
</script>

<template>
  <div>
    <Modal />
    <ServiceListHeader />
    <main class="-mt-32">
      <div class="max-w-5xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <ServiceList />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import ServiceList from '@/components/ServiceList.vue'
import ServiceListHeader from '@/components/ServiceListHeader.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'Home',
  components: {
    ServiceList,
    ServiceListHeader,
    Modal
  }
}
</script>

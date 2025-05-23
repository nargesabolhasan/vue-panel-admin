<script setup>
import { ref, computed } from 'vue'
import AbstractTable from './table/Table.vue'
import AbstractPagination from './pagination/Pagination.vue'

// Example items (replace with your real data)
const items = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Billy Bob', email: 'billy@example.com', role: 'User' },
  { id: 4, name: 'Billy Bob', email: 'billy@example.com', role: 'User' },
  { id:5, name: 'Billy Bob', email: 'billy@example.com', role: 'User' },
])

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
]

const pageSize = 2
const currentPage = ref(1)

// Calculate sliced data for current page
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return items.value.slice(start, start + pageSize)
})

// Update page handler
function updatePage(page) {
  currentPage.value = page
}
</script>

<template>
  <section class="dashboard-page">
    <h1>Dashboard</h1>
    <AbstractTable :columns="columns" :data="paginatedData" />

    <AbstractPagination
      :totalItems="items.length"
      :pageSize="pageSize"
      :currentPage="currentPage"
      @update:currentPage="updatePage"
    />
  </section>
</template>

<style scoped>
.dashboard-page {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
}
</style>

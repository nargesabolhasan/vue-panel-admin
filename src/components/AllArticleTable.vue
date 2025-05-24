<script lang="ts" setup>
import { ref, computed } from 'vue'
import Pagination from '@/components/pagination/Pagination.vue'
import Table from '@/components/table/Table.vue'

const props = defineProps<{
  items: Array<{ id: number; name: string; email: string; role: string }>
}>()

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description' },
  { key: 'body', label: 'Body' },
  {
    key: 'tags',
    label: 'Tags',
    render: (row) => row.tags.join(', '),
  },
]

const pageSize = 2
const currentPage = ref(1)

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return props.items.slice(start, start + pageSize)
})

function updatePage(page: number) {
  currentPage.value = page
}
</script>

<template>
  <section class="dashboard-page">
    <h1>Dashboard</h1>
    <Table :columns="columns" :data="paginatedData" />

    <Pagination
      :totalItems="props.items.length"
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

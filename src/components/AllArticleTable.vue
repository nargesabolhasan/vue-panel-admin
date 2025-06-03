<script lang="ts" setup>
import { ref, computed, h } from 'vue'
import Pagination from '@/components/pagination/Pagination.vue'
import Table from '@/components/table/Table.vue'

interface Article {
  id: number
  title: string
  description: string
  body: string
  tags: string[]
}

const props = defineProps<{ items: Article[] }>()
const emit = defineEmits<{
  (e: 'edit-article', article: Article): void
  (e: 'delete-article', id: number): void
}>()

const pageSize = 2
const currentPage = ref(1)

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return props.items.slice(start, start + pageSize)
})

function updatePage(page: number) {
  currentPage.value = page
}

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description' },
  { key: 'body', label: 'Body' },
  {
    key: 'tags',
    label: 'Tags',
    render: (row: Article) => (Array.isArray(row.tags) ? row.tags.join(', ') : '—'),
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (row: Article) =>
      h('div', { class: 'flex gap-2' }, [
        h(
          'button',
          {
            class: 'text-blue-500 underline',
            onClick: () => emit('edit-article', { ...row, title: row.title + ' (edited)' }),
          },
          'Edit',
        ),
        h(
          'button',
          {
            class: 'text-red-500 underline',
            onClick: () => emit('delete-article', row.id),
          },
          'Delete',
        ),
      ]),
  },
]
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

<script lang="ts" setup>
import { ref, computed, h } from 'vue'
import Pagination from '@/components/pagination/Pagination.vue'
import Table from '@/components/table/Table.vue'
import ContextMenu from '@/components/contextMenu/ContextMenu.vue'

interface Article {
  id: number
  title: string
  description: string
  body: string
  selectedTags: string[]
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
    render: (row: Article) => (Array.isArray(row.selectedTags) ? row.selectedTags.join(', ') : '—'),
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (row: Article) =>
      h(ContextMenu, {
        items: [
          {
            title: 'Edit',
            action: () => emit('edit-article', { ...row, title: row.title + ' (edited)' }),
          },
          {
            title: 'Delete',
            action: () => emit('delete-article', row.id),
          },
        ],
      }),
  },
]
</script>

<template>
  <section class="form-wrapper flex flex-col items-center md:items-end gap-4">
    <h2 class="self-start">All Posts</h2>
    <Table :columns="columns" :data="paginatedData" />

    <Pagination
      v-if="props.items.length > pageSize"
      :totalItems="props.items.length"
      :pageSize="pageSize"
      :currentPage="currentPage"
      @update:currentPage="updatePage"
    />
  </section>
</template>

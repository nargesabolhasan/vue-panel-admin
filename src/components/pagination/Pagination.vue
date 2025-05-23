<script setup>
import { computed, defineEmits, defineProps } from 'vue'
import PaginationButtons from '@/components/buttons/PaginationButtons.vue'

const props = defineProps({
  totalItems: { type: Number, required: true },
  pageSize: { type: Number, required: true },
  currentPage: { type: Number, required: true },
})

const emits = defineEmits(['update:currentPage'])

const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize))

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    emits('update:currentPage', page)
  }
}

const paginationItems = computed(() => {
  const pages = []
  const current = props.currentPage
  const total = totalPages.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)

    if (current > 3) {
      pages.push('...')
    }

    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (current < total - 2) {
      pages.push('...')
    }

    pages.push(total)
  }

  return pages
})
</script>

<template>
  <nav
    class="bg-neutral_bg1 flex items-center space-x-2 p-1 border border-neutral_st2 rounded-lg w-fit"
    aria-label="Pagination Navigation"
  >
    <PaginationButtons :disabled="props.currentPage === 1" @click="goToPage(props.currentPage - 1)">
      <i class="icon-arrow-left" />
    </PaginationButtons>
    <PaginationButtons
      v-for="(page, index) in paginationItems"
      :key="index"
      :selected="page === props.currentPage"
      @click="typeof page === 'number' && goToPage(page)"
    >
      <template v-if="page === '...'">
        <i class="icon-more-item" />
      </template>
      <template v-else>
        {{ page }}
      </template>
    </PaginationButtons>
    <PaginationButtons
      :disabled="props.currentPage === totalPages"
      @click="goToPage(props.currentPage + 1)"
    >
      <i class="icon-arrow-right" />
    </PaginationButtons>
  </nav>
</template>

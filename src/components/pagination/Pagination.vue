<script setup>
import { computed, defineProps, defineEmits } from 'vue'

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
</script>

<template>
  <nav class="pagination" aria-label="Pagination Navigation">
    <button
      :disabled="props.currentPage === 1"
      @click="goToPage(props.currentPage - 1)"
      aria-label="Previous page"
    >
      Prev
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: page === props.currentPage }"
      aria-current="page"
    >
      {{ page }}
    </button>

    <button
      :disabled="props.currentPage === totalPages"
      @click="goToPage(props.currentPage + 1)"
      aria-label="Next page"
    >
      Next
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin: 1rem 0;

  button {
    background: #eee;
    border: none;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    border-radius: 4px;

    &.active {
      background: #4f46e5;
      color: white;
      font-weight: bold;
      cursor: default;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}
</style>

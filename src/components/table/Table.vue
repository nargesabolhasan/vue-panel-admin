<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <table class="abstract-table">
    <thead>
      <tr>
        <th v-for="col in props.columns" :key="col.key">{{ col.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, idx) in props.data" :key="idx">
        <td v-for="col in props.columns" :key="col.key">
          <component v-if="col.render" :is="{ render: () => col.render(row) }" />
          <template v-else>
            {{ row[col.key] }}
          </template>
        </td>
      </tr>
      <tr v-if="props.data.length === 0">
        <td :colspan="props.columns.length" class="empty">No data available.</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.abstract-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    border: 1px solid #ddd;
    padding: 0.75rem;
    text-align: left;
  }

  th {
    background-color: #f3f4f6;
    font-weight: 600;
  }

  .empty {
    text-align: center;
    font-style: italic;
    color: #888;
  }
}
</style>

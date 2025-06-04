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
  <!-- Desktop Table -->
  <div class="hidden md:block overflow-x-auto">
    <table class="min-w-full divide-y divide-neutral_st2_hover">
      <thead class="bg-neutral_bg2_default">
        <tr>
          <th
            v-for="col in props.columns"
            :key="col.key"
            class="px-4 py-3 text-left text-sm font-semibold text-neutral_fg1"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-neutral_st2_hover">
        <tr
          v-for="(row, idx) in props.data"
          :key="idx"
          class="hover:bg-neutral_bg1_press transition relative"
        >
          <td
            v-for="col in props.columns"
            :key="col.key"
            class="px-4 py-3 text-sm text-neutral_fg2"
          >
            <component v-if="col.render" :is="{ render: () => col.render(row) }" />
            <template v-else>
              {{ row[col.key] }}
            </template>
          </td>
        </tr>
        <tr v-if="props.data.length === 0">
          <td :colspan="props.columns.length" class="px-4 py-3 italic text-center text-neutral_fg3">
            No data available.
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Mobile Card View -->
  <div class="md:hidden flex flex-col gap-4 mt-4">
    <div
      v-for="(row, idx) in props.data"
      :key="idx"
      class="border rounded-lg p-4 bg-white shadow-sm"
    >
      <div
        v-for="col in props.columns"
        :key="col.key"
        class="mb-2 text-sm text-neutral_fg1 border-b"
      >
        <span class="text-lg block mb-1 text-black font-bold">{{ col.label }}:</span>
        <div class="text-neutral_fg1 text-sm">
          <component v-if="col.render" :is="{ render: () => col.render(row) }" />
          <template v-else>
            {{ row[col.key] }}
          </template>
        </div>
      </div>
    </div>
    <div v-if="props.data.length === 0" class="text-center text-neutral_fg3 italic">
      No data available.
    </div>
  </div>
</template>

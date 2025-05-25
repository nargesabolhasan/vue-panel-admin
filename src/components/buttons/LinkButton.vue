<template>
  <RouterLink
    v-if="!disabled"
    :to="to"
    class="inline-block px-4 py-2 rounded-md font-semibold bg-transparent text-pt_info_t2_fg1 hover:text-pt_info_t2_fg1_hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {{ title }}
  </RouterLink>

  <span
    v-else
    aria-disabled="true"
    tabindex="-1"
    class="inline-block px-4 py-2 rounded-md font-semibold bg-indigo-600 text-white opacity-50 cursor-not-allowed select-none"
  >
    {{ title }}
  </span>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  to: string | Record<string, any>
  title: string
  disabled?: boolean
}>()
</script>

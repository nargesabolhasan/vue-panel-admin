<template>
  <div :class="['animate-spin', sizeClass, colorClass]" role="status">
    <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?: 'primary' | 'white' | 'gray' | 'danger'
}>()

const sizeClass = computed(() => {
  return {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }[props.size || 'md']
})

const colorClass = computed(() => {
  return {
    primary: 'text-primary',
    white: 'text-neutral_bg1',
    gray: 'text-neutral_fg1',
    danger: 'text-error',
  }[props.color || 'primary']
})
</script>

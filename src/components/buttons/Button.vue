<template>
  <button
    :disabled="disabled || loading"
    :class="[
      'h-10 px-4 py-2 rounded-lg font-medium flex items-center justify-center transition-all duration-300',
      colorClasses,
      { 'opacity-50 cursor-not-allowed': disabled || loading },
    ]"
  >
    <template v-if="loading">
      <Spinner :size="spinnerSize ?? 'md'" :color="spinnerColor ?? 'gray'" />
    </template>
    <template v-else>
      <span>{{ title }}</span>
    </template>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Spinner from '@/components/spinner/Spinner.vue'

const props = defineProps<{
  title: string
  disabled?: boolean
  color?: 'primary' | 'secondary' | 'danger'
  loading?: boolean
  spinnerColor?: 'primary' | 'white' | 'gray' | 'danger'
  spinnerSize?: 'xs' | 'sm' | 'md' | 'lg'
}>()

const colorClasses = computed(() => {
  switch (props.color) {
    case 'secondary':
      return 'bg-neutral border border-neutral_fg1 hover:bg-neutral_hover text-neutral_fg1_hover'
    case 'danger':
      return 'bg-error hover:bg-error_hover text-neutral_bg1'
    case 'primary':
    default:
      return 'bg-primary hover:bg-primary_hover text-neutral_bg1'
  }
})
</script>

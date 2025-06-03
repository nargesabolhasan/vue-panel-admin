<template>
  <label
    class="relative flex items-center gap-2 cursor-pointer select-none"
    :class="{ 'cursor-not-allowed opacity-50': disabled }"
  >
    <input
      ref="checkbox"
      type="checkbox"
      class="appearance-none h-5 w-5 border-2 border-neutral_st1_default rounded-md transition duration-150 ease-in-out checked:bg-primary checked:border-primary disabled:cursor-not-allowed disabled:opacity-50"
      :checked="modelValue"
      :disabled="disabled"
      @change="handleChange"
    />

    <svg
      v-if="modelValue && !indeterminate"
      class="pointer-events-none absolute left-1.5 top-1.5 h-2.5 w-2.5 text-white"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>

    <svg
      v-if="indeterminate"
      class="pointer-events-none absolute left-1 top-2 h-2 w-3 text-white"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <line x1="1" y1="4" x2="30" y2="4" stroke-linecap="round" />
    </svg>

    <span class="text-sm font-medium text-neutral_fg1">{{ label }}</span>
  </label>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, onMounted, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  label?: string
  disabled?: boolean
  indeterminate?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const checkbox = ref<HTMLInputElement | null>(null)

function handleChange(event: Event) {
  if (props.disabled) return
  const input = event.target as HTMLInputElement
  emit('update:modelValue', input.checked)
}

function setIndeterminate() {
  if (checkbox.value) {
    checkbox.value.indeterminate = !!props.indeterminate
  }
}

onMounted(setIndeterminate)
watch(() => props.indeterminate, setIndeterminate)
</script>

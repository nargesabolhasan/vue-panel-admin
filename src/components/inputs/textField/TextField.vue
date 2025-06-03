<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch, computed, type Ref } from 'vue'

const props = defineProps<{
  modelValue: string | Ref
  title?: string
  disabled?: boolean
  readonly?: boolean
  error?: string
  hint?: string
  size?: 'sm' | 'md' | 'lg'
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputValue = ref(props.modelValue)

const inputId = `input-${Math.random().toString(36).substr(2, 9)}`

watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal
  },
)

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  inputValue.value = target.value
  emit('update:modelValue', target.value)
}

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-[38px] text-sm'
    case 'lg':
      return 'h-[48px] text-lg'
    case 'md':
    default:
      return 'h-10 text-base'
  }
})
</script>

<template>
  <div class="flex flex-col">
    <label v-if="title" :for="inputId" class="text-start mb-1 font-medium text-gray-700">
      {{ title }}
    </label>
    <input
      :id="inputId"
      :value="inputValue"
      @input="onInput"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :class="[
        'border rounded-lg px-3 focus:outline-none transition text-neutral_fg1_hover bg-neutral_bg1 border-neutral_st2_hover focus:border-primary',
        sizeClasses,
        disabled && 'opacity-45 cursor-not-allowed',
        readonly && 'border-neutral_fg2 cursor-default focus:border-neutral_fg2',
        error && '!border-error focus:border-error_hover',
      ]"
      type="text"
    />
    <p v-if="error" class="mt-1 text-sm text-error" role="alert">
      {{ error }}
    </p>
    <p v-else-if="hint" class="mt-1 text-sm text-neutral_fg2">
      {{ hint }}
    </p>
  </div>
</template>

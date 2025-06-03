<template>
  <ul class="border border-neutral_st2 p-3 rounded-xl space-y-2">
    <li v-for="(tag, index) in tags" :key="index">
      <CheckBox
        :label="tag.title"
        :model-value="modelValue.includes(tag.title)"
        @update:modelValue="(checked) => onCheckboxToggle(tag.title, checked)"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import CheckBox from '@/components/inputs/checkbox/CheckBox.vue'

const props = defineProps({
  tags: {
    type: Array as () => { title: string }[],
    required: true,
  },
  modelValue: {
    type: Array as () => string[],
    default: () => [],
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

function onCheckboxToggle(tag: string, checked: boolean) {
  let updated = [...props.modelValue]

  if (checked && !updated.includes(tag)) {
    updated.push(tag)
  } else if (!checked) {
    updated = updated.filter((t) => t !== tag)
  }

  emit('update:modelValue', updated)
}
</script>

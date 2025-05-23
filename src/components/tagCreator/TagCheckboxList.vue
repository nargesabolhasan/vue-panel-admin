<template>
  <ul class="tags">
    <li v-for="(tag, index) in tags" :key="index" class="tag-item">
      <label>
        <input
          type="checkbox"
          :value="tag.title"
          :checked="modelValue.includes(tag.title)"
          @change="onCheckChange(tag.title, $event)"
          @input="$emit('update:tags', $event.target.value)"
          name="tags"
        />
        {{ tag.title }}
      </label>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

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

function onCheckChange(tag: string, event: Event) {
  const checked = (event.target as HTMLInputElement).checked
  let updated = [...props.modelValue]

  if (checked && !updated.includes(tag)) {
    updated.push(tag)
  } else if (!checked) {
    updated = updated.filter((t) => t !== tag)
  }

  emit('update:modelValue', updated)
}
</script>

<style scoped lang="scss">
.tags {
  list-style: none;
  padding: 0;
  margin: 0;

  .tag-item {
    display: flex;
    align-items: center;

    label {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}
</style>

<template>
  <div class="tag-manager">
    <GetNewTagTitle @add="addTag" />
    <TagCheckboxList
      :tags="tags"
      :model-value="modelValue"
      @update:modelValue="updateSelectedTags"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import GetNewTagTitle from '@/components/tagCreator/GetNewTagTitle.vue'
import TagCheckboxList from '@/components/tagCreator/TagCheckboxList.vue'

const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits(['update:modelValue'])

const tags = ref<{ title: string }[]>([])

function addTag(newTag: string) {
  if (!tags.value.some((t) => t.title.toLowerCase() === newTag.toLowerCase())) {
    tags.value.push({ title: newTag })
  }
}

function updateSelectedTags(val: string[]) {
  emit('update:modelValue', val)
}
</script>

<style scoped>
.tag-manager {
  max-width: 400px;
  margin: auto;
}
</style>

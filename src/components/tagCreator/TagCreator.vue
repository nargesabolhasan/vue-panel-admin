<template>
  <div class="tag-manager">
    <GetNewTagTitle @add="addTag" />
    <TagCheckboxList :tags="tags" v-model="selectedTags" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import GetNewTagTitle from '@/components/tagCreator/GetNewTagTitle.vue'
import TagCheckboxList from '@/components/tagCreator/TagCheckboxList.vue'

const tags = ref<{ title: string }[]>([])
const selectedTags = ref<string[]>([])

function addTag(newTag: string) {
  if (!tags.value.some((t) => t.title.toLowerCase() === newTag.toLowerCase())) {
    tags.value.push({ title: newTag })
  }
}
</script>

<style scoped>
.tag-manager {
  max-width: 400px;
  margin: auto;
}
</style>

<!--<template>-->
<!--  <div class="tag-manager">-->
<!--    <GetNewTagTitle @add="addTag" />-->
<!--    <TagCheckboxList :tags="tags" v-model="selectedTags" />-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import { ref, watch, defineEmits, defineProps } from 'vue'-->
<!--import GetNewTagTitle from '@/components/tagCreator/GetNewTagTitle.vue'-->
<!--import TagCheckboxList from '@/components/tagCreator/TagCheckboxList.vue'-->

<!--const props = defineProps({-->
<!--  modelValue: {-->
<!--    type: Array as () => string[],-->
<!--    default: () => [],-->
<!--  },-->
<!--})-->

<!--const emit = defineEmits(['update:modelValue'])-->

<!--const tags = ref<{ title: string }[]>([])-->
<!--const selectedTags = ref<string[]>([...props.modelValue])-->

<!--watch(-->
<!--  () => props.modelValue,-->
<!--  (newVal) => {-->
<!--    selectedTags.value = newVal-->
<!--  },-->
<!--)-->

<!--// When selectedTags changes, emit update-->
<!--watch(selectedTags, (newVal) => {-->
<!--  emit('update:modelValue', newVal)-->
<!--})-->

<!--function addTag(newTag: string) {-->
<!--  if (!tags.value.some((t) => t.title.toLowerCase() === newTag.toLowerCase())) {-->
<!--    tags.value.push({ title: newTag })-->
<!--  }-->
<!--}-->
<!--</script>-->

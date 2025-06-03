<script lang="ts" setup>
import { defineProps, type Ref } from 'vue'
import TextField from '@/components/inputs/textField/TextField.vue'
import type { FieldContext } from 'vee-validate'

const props = defineProps<{
  titleField: FieldContext<string>
  descriptionField: FieldContext<string>
  bodyField: FieldContext<string>
}>()
</script>

<template>
  <TextField
    id="title"
    title="Title"
    placeholder="Title"
    v-model="props.titleField.value"
    type="text"
    @blur="props.titleField.handleBlur"
    :error="props.titleField.errorMessage?.value"
  />

  <TextField
    id="description"
    title="Description"
    placeholder="Description"
    v-model="props.descriptionField.value"
    type="text"
    @blur="props.descriptionField.handleBlur"
    :error="props.descriptionField.errorMessage?.value"
  />

  <TextField
    id="body"
    title="Body"
    placeholder="Body"
    v-model="props.bodyField.value"
    type="text"
    @blur="props.bodyField.handleBlur"
    :error="props.bodyField.errorMessage?.value"
  />
</template>

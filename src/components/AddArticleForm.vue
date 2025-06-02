<script lang="ts" setup>
import { useField } from 'vee-validate'
import TextField from '@/components/inputs/textField/TextField.vue'

const titleField = useField<string>('title')
const descriptionField = useField<string>('description', undefined, {
  initialValue: '',
})
const bodyField = useField<string>('body', undefined, {
  initialValue: '',
})
</script>

<template>
  <TextField
    id="title"
    title="Title"
    placeholder="Title"
    v-model="titleField.value"
    type="text"
    @blur="titleField.handleBlur"
    :error="titleField.errorMessage?.value"
  />

  <TextField
    id="description"
    title="Description"
    placeholder="Description"
    v-model="descriptionField.value"
    type="text"
    @blur="descriptionField.handleBlur"
    :error="descriptionField.errorMessage?.value"
  />

  <TextField
    id="body"
    title="Body"
    placeholder="Body"
    v-model="bodyField.value"
    type="text"
    @blur="bodyField.handleBlur"
    :error="bodyField.errorMessage?.value"
  />
</template>

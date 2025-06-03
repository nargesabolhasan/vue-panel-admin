<script lang="ts" setup>
import { defineProps } from 'vue'
import TextField from '@/components/inputs/textField/TextField.vue'
import type { FieldContext, FormMeta, GenericObject } from 'vee-validate'
import Button from '@/components/buttons/Button.vue'

const props = defineProps<{
  titleField: FieldContext<string>
  descriptionField: FieldContext<string>
  bodyField: FieldContext<string>
  loading: boolean
  meta: FormMeta<GenericObject>
}>()
</script>

<template>
  <div class="form-wrapper h-[480px] grow">
    <span class="text-start font-bold py-4">New Article</span>

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
      type="textarea"
      @blur="props.bodyField.handleBlur"
      :error="props.bodyField.errorMessage?.value"
    />
    <Button
      type="submit"
      :disabled="loading || !meta.valid"
      title="Submit"
      color="primary"
      :loading="loading"
      spinnerColor="gray"
      spinnerSize="sm"
      class="w-fit"
    />
  </div>
</template>

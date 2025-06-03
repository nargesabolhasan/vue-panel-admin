<template>
  <form @submit.prevent="handleAddTag" class="flex flex-row gap-1">
    <TextField
      label="Tags"
      v-model="newTag"
      placeholder="New tag"
      type="text"
      class="tag-input"
      aria-describedby="tag-error"
    />

    <Button color="secondary" type="submit" :disabled="!isValid">
      <i class="icon-primary-tick" />
    </Button>
  </form>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import Button from '@/components/buttons/Button.vue'
import TextField from '@/components/inputs/textField/TextField.vue'

const emit = defineEmits<{
  (e: 'add', value: string): void
}>()

const { resetForm } = useForm()
const {
  value: newTag,
  errorMessage: newTagError,
  validate: validateNewTag,
} = useField<string>('newTag', yup.string().trim().required('fill tag title'))

const isValid = ref(false)

watch(newTag, async () => {
  const result = await validateNewTag()
  isValid.value = result.valid
})

async function handleAddTag() {
  const isValid = await validateNewTag()
  const trimmedTag = newTag.value.trim()

  if (!isValid) return

  emit('add', trimmedTag)
  resetForm()
}
</script>

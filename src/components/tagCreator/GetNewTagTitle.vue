<!-- src/components/AddTag.vue -->
<template>
  <form @submit.prevent="handleAddTag" class="input-with-button">
    <input
      v-model="newTag"
      placeholder="Type a tag"
      type="text"
      class="tag-input"
      :class="{ invalid: newTagError }"
      aria-describedby="tag-error"
    />
    <button type="submit" class="add-tag-btn" aria-label="Add tag" :disabled="!isValid">✅</button>
    <p v-if="newTagError" id="tag-error" class="error">{{ newTagError }}</p>
  </form>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

const emit = defineEmits<{
  (e: 'add', value: string): void
}>()

const { handleSubmit, resetForm } = useForm()
const {
  value: newTag,
  errorMessage: newTagError,
  validate: validateNewTag,
} = useField('newTag', yup.string().trim().required('Tag is required'))

const isValid = ref(false)

watch(newTag, async () => {
  isValid.value = await validateNewTag()
})

async function handleAddTag() {
  const isValid = await validateNewTag()
  const trimmedTag = newTag.value.trim()

  if (!isValid) return

  emit('add', trimmedTag)
  resetForm()
}
</script>

<style scoped>
.input-with-button {
  display: flex;
  gap: 0.5rem;
}

.tag-input {
  flex-grow: 1;
  padding: 8px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 6px;

  &.invalid {
    border-color: #e3342f;
  }
}

.add-tag-btn {
  padding: 8px 12px;
  font-size: 18px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}

.error {
  color: #e3342f;
  font-size: 0.9rem;
  margin-top: -0.5rem;
}
</style>

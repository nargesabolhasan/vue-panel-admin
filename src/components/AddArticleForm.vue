<template>
  <form @submit.prevent="onSubmit" class="form-container" novalidate>
    <div class="form-group">
      <label for="title">Title *</label>
      <input
        id="title"
        v-model="title"
        type="text"
        @blur="titleBlur"
        :class="{ invalid: titleError }"
        aria-describedby="title-error"
      />
      <p id="title-error" v-if="titleError" class="error">{{ titleError }}</p>
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <input
        id="description"
        v-model="description"
        type="text"
        @blur="descriptionBlur"
        :class="{ invalid: descriptionError }"
        aria-describedby="description-error"
      />
      <p id="description-error" v-if="descriptionError" class="error">{{ descriptionError }}</p>
    </div>

    <div class="form-group">
      <label for="body">Body</label>
      <textarea
        id="body"
        v-model="body"
        rows="5"
        @blur="bodyBlur"
        :class="{ invalid: bodyError }"
        aria-describedby="body-error"
      />
      <p id="body-error" v-if="bodyError" class="error">{{ bodyError }}</p>
    </div>

    <button
      type="submit"
      :disabled="loading || !meta.valid"
      class="submit-button"
    >
      {{ loading ? 'Submitting...' : 'Submit' }}
    </button>
  </form>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const props = defineProps<{
  loading?: boolean
  onsubmit: (data: {
    title: string
    description: string
    body: string
  }) => void
}>()

// Define Yup schema
const schema = yup.object({
  title: yup.string().trim().required('Title is required'),
  description: yup.string(),
  body: yup.string(),
})

// Setup vee-validate form with schema
const { handleSubmit, meta } = useForm({
  validationSchema: schema,
})

// Setup fields
const {
  value: title,
  errorMessage: titleError,
  handleBlur: titleBlur
} = useField('title')

const {
  value: description,
  errorMessage: descriptionError,
  handleBlur: descriptionBlur
} = useField('description')

const {
  value: body,
  errorMessage: bodyError,
  handleBlur: bodyBlur
} = useField('body')

// Submit handler
const onSubmit = handleSubmit(values => {
  if (!props.loading) {
    props.onsubmit(values)
  }
})
</script>

<style scoped lang="scss">
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
}

.form-group {
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  input,
  textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;

    &.invalid {
      border-color: red;
    }
  }

  .error {
    margin-top: 0.25rem;
    color: red;
    font-size: 0.875rem;
  }
}

.submit-button {
  padding: 0.75rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}
</style>

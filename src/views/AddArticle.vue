<template>
  <form @submit.prevent="submitAll" class="new-article-page" novalidate>
    <AddArticleForm
      v-model:title="title"
      v-model:description="description"
      v-model:body="body"
      :title-error="titleError"
      :title-blur="titleBlur"
      :description-error="descriptionError"
      :description-blur="descriptionBlur"
      :body-error="bodyError"
      :body-blur="bodyBlur"
    />

    <TagCreator v-model:tags="tags" />
    <p v-if="tagsError" class="error">{{ tagsError }}</p>

    <button type="submit" :disabled="loading || !meta.valid" class="final-submit-btn">
      {{ loading ? 'Submitting...' : 'Submit' }}
    </button>
  </form>
</template>

<script lang="ts" setup>
import AddArticleForm from '@/components/AddArticleForm.vue'
import TagCreator from '@/components/tagCreator/TagCreator.vue'
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import '@/assets/styles/addNewArticle.scss'

const loading = ref(false)

const schema = yup.object({
  title: yup.string().trim().required('Title is required'),
  description: yup.string(),
  body: yup.string(),
  tags: yup.array().of(yup.string()).min(1, 'At least one tag is required'),
})

const { handleSubmit, meta } = useForm({
  validationSchema: schema,
})

const { value: title, errorMessage: titleError, handleBlur: titleBlur } = useField('title')
const {
  value: description,
  errorMessage: descriptionError,
  handleBlur: descriptionBlur,
} = useField('description')
const { value: body, errorMessage: bodyError, handleBlur: bodyBlur } = useField('body')
const { value: tags, errorMessage: tagsError, handleBlur: tagsBlur } = useField<string[]>('tags')

const submitAll = handleSubmit((values) => {
  loading.value = true
  console.log('Submitted values:', values)
  loading.value = false
})
</script>

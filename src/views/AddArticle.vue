<template>
  <form @submit.prevent="submitAll" class="form-wrapper rounded-3xl gap-3" novalidate>
    <AddArticleForm
      :titleField="titleField"
      :descriptionField="descriptionField"
      :bodyField="bodyField"
    />

    <TagCreator v-model="selectedTags" />
    <p v-if="tagsError" class="error">{{ tagsError }}</p>

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
  </form>
</template>

<script lang="ts" setup>
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import AddArticleForm from '@/components/AddArticleForm.vue'
import TagCreator from '@/components/tagCreator/TagCreator.vue'
import Button from '@/components/buttons/Button.vue'
import '@/assets/styles/addNewArticle.scss'
import { useFetch } from '@/composables/useFetch.ts'
import { ARTICLES_API } from '@/constants/constant.ts'
import { showToast } from '@/components/toast/ShowToast.ts'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

const { loading, run } = useFetch<any>()
const route = useRoute()
const articleId = route.params.id as string | undefined
const isEditMode = !!articleId

const schema = yup.object({
  title: yup.string().trim().required('Title is required'),
  description: yup.string(),
  body: yup.string(),
  selectedTags: yup.array().of(yup.string()),
})

const { handleSubmit, meta, resetForm } = useForm({
  validationSchema: schema,
})

const { value: selectedTags, errorMessage: tagsError } = useField<string[]>('selectedTags')
const titleField = useField<string>('title', undefined)
const descriptionField = useField<string>('description')
const bodyField = useField<string>('body', undefined)

const loadArticle = async () => {
  if (!articleId) return
  try {
    const data = await run(`${ARTICLES_API}/${articleId}`)
    if (data) {
      resetForm({
        values: {
          title: data.title || '',
          description: data.description || '',
          body: data.body || '',
          selectedTags: data.selectedTags || [],
        },
      })
    }
  } catch (err) {
    showToast('danger', 'Error', 'Failed to load article data.')
  }
}

onMounted(() => {
  if (isEditMode) {
    loadArticle()
  } else {
    resetForm({
      values: {
        title: '',
        description: '',
        body: '',
        selectedTags: [],
      },
    })
    selectedTags.value = []
  }
})

const submitAll = handleSubmit(async (values) => {
  try {
    await run(`${ARTICLES_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    resetForm({
      values: {
        title: '',
        description: '',
        body: '',
        selectedTags: [],
      },
    })
    selectedTags.value = []
    showToast('success', 'Well done!', 'Article created successfully.')
  } catch (err) {
    showToast('success', 'Error', 'Article created failed!')
  }
})
</script>

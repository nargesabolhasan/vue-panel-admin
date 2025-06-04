<template>
  <form @submit.prevent="submitAll" class="flex flex-col h-full" novalidate>
    <div class="h-full flex flex-col lg:flex-row gap-6 bg-neutral_bg2_default">
      <AddArticleForm
        :titleField="titleField"
        :descriptionField="descriptionField"
        :bodyField="bodyField"
        :loading="loading || editLoading"
        :meta="meta"
      />
      <TagCreator v-model="selectedTags" />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import AddArticleForm from '@/components/AddArticleForm.vue'
import TagCreator from '@/components/tagCreator/TagCreator.vue'
import { useFetch } from '@/composables/useFetch.ts'
import { ARTICLES_API } from '@/constants/constant.ts'
import { showToast } from '@/components/toast/ShowToast.ts'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import type { Article } from '@/views/AllArticles.vue'

const { loading, run } = useFetch<any>()
const { loading: editLoading, run: runEdit } = useFetch<Article>()
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

const { value: selectedTags } = useField<string[]>('selectedTags')
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
  if (isEditMode) {
    try {
      await runEdit(`${ARTICLES_API}/${articleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      showToast('success', 'Updated!', `This Article updated.`)
    } catch (err) {
      showToast('danger', 'Error!', 'Failed to update article.')
    }
  } else {
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
  }
})
</script>

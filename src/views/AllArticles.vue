<template>
  <div>
    <Loading v-if="loading" />
    <AllArticleTable
      v-else-if="articles"
      :items="toRaw(articles)"
      @delete-article="handleDelete"
      @edit-article="handleEdit"
    />
    <p v-else class="text-red-500">No articles found.</p>
  </div>
</template>

<script lang="ts" setup>
import AllArticleTable from '@/components/AllArticleTable.vue'
import Loading from '@/components/loading/Loading.vue'
import { useFetch } from '@/composables/useFetch.ts'
import { onMounted, toRaw } from 'vue'
import { ARTICLES_API } from '@/constants/constant.ts'
import { showToast } from '@/components/toast/ShowToast.ts'
import { usePrompt } from '@/components/promptModal/usePrompt.ts'
import { DASHBOARD_ROUTES_NAME } from '@/constants/routes.ts'
import { useRouter } from 'vue-router'

export interface Article {
  id: number
  title: string
  description: string
  body: string
  tags: string[]
}

const { data: articles, loading, run } = useFetch<Article>()
const { loading: deleteLoading, run: runDelete } = useFetch<Article>()
const { loading: editLoading, run: runEdit } = useFetch<Article>()
const router = useRouter()
const showPrompt = usePrompt()

const fetchArticles = async () => {
  await run(`${ARTICLES_API}?page=1&_limit=3`)
}

onMounted(async () => {
  try {
    await fetchArticles()
  } catch (err) {
    showToast('danger', 'Error!', 'Failed to fetch articles.')
  }
})

async function handleDelete(id: number) {
  showPrompt({
    title: 'Delete Article',
    status: 'danger',
    body: 'Are you sure you want to delete this article?',
    cancelText: 'Cancel',
    confirmText: 'Delete',
    loading: deleteLoading?.value,
    onConfirm: async () => {
      try {
        await runDelete(`${ARTICLES_API}/${id}`, { method: 'DELETE' })
        showToast('success', 'Deleted!', `Article ${id} deleted.`)
        await fetchArticles()
      } catch (err) {
        showToast('danger', 'Error!', 'Failed to delete article.')
      }
    },
  })
}

async function handleEdit(article: Article) {
  router.push({
    name: DASHBOARD_ROUTES_NAME.ADD_ARTICLE,
    params: { id: article.id },
  })

  // try {
  //   await runEdit(`${ARTICLES_API}/${article.id}`, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(article),
  //   })
  //   showToast('success', 'Updated!', `Article ${article.id} updated.`)
  //   await fetchArticles()
  // } catch (err) {
  //   showToast('danger', 'Error!', 'Failed to update article.')
  // }
}
</script>

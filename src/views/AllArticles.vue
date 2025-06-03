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

export interface Article {
  id: number
  title: string
  description: string
  body: string
  tags: string[]
}

const { data: articles, loading, run } = useFetch<Article>()

onMounted(async () => {
  try {
    await run(`${ARTICLES_API}?_page=2&_limit=3`)
  } catch (err) {
    showToast('danger', 'Error!', 'Failed to fetch articles.')
  }
})

async function handleDelete(id: number) {
  try {
    await fetch(`${ARTICLES_API}/${id}`, { method: 'DELETE' })
    showToast('success', 'Deleted!', `Article ${id} deleted.`)
    await run(`${ARTICLES_API}?_page=2&_limit=3`)
  } catch (err) {
    showToast('danger', 'Error!', 'Failed to delete article.')
  }
}

async function handleEdit(article: Article) {
  try {
    await fetch(`${ARTICLES_API}/${article.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article),
    })
    showToast('success', 'Updated!', `Article ${article.id} updated.`)
    await run(`${ARTICLES_API}?_page=2&_limit=3`)
  } catch (err) {
    showToast('danger', 'Error!', 'Failed to update article.')
  }
}
</script>

<template>
  <div>
    <Loading v-if="loading" />
    <AllArticleTable v-else-if="articles" :items="toRaw(articles)" />
    <p v-else class="text-red-500">No articles found.</p>
  </div>
</template>

<script lang="ts" setup>
import AllArticleTable from '@/components/AllArticleTable.vue'
import Loading from '@/components/loading/Loading.vue'
import { useFetch } from '@/composables/useFetch.ts'
import { onMounted, toRaw } from 'vue'
import { ARTICLES_API } from '@/constants/constant.ts'

export interface Article {
  id: number
  title: string
  description: string
  body: string
  tags: string[]
}

const { data: articles, loading, error, run } = useFetch<any>()

onMounted(async () => {
  await run(`${ARTICLES_API}?_page=3&_limit=3`)
})
</script>

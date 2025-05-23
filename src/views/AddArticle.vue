<template>
  <div class="add-article-page">
    <h1>Add New Article</h1>

    <AddArticleForm
      :loading="loading"
      :onsubmit="handleSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import AddArticleForm from '@/components/AddArticleForm.vue'

const loading = ref(false)

function handleSubmit(data: { title: string; description: string; body: string }) {
  loading.value = true

  // Simulate async request
  setTimeout(() => {
    console.log('Article Submitted:', data)
    loading.value = false
    alert('Article submitted successfully!')
  }, 1500)
}
</script>

<style scoped lang="scss">
.add-article-page {
  padding: 2rem;

  h1 {
    margin-bottom: 1.5rem;
    color: #111827;
  }
}
</style>

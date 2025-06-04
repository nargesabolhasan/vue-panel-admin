<template>
  <div id="app" class="bg-neutral_bg2_default h-screen">
    <main class="flex flex-col h-full">
      <RouterView />
      <Toast />
    </main>
  </div>
</template>

<script lang="ts" setup>
import Toast from '@/components/toast/Toast.vue'
</script>

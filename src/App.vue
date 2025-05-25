<template>
  <div id="app" class="bg-neutral_bg2_default h-[100vh]">
    <main class="main-content">
      <RouterView />
      <Toast />
    </main>
  </div>
</template>

<script lang="ts" setup>
import Toast from '@/components/toast/Toast.vue'
</script>

<style scoped lang="scss">
#app {
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
  padding: 1rem;
}
</style>

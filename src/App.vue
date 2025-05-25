<template>
  <div id="app" class="bg-neutral_bg2_default">
    <nav class="navbar">
      <RouterLink to="/login">Login</RouterLink> | <RouterLink to="/sign-in">Sign In</RouterLink> |
      <RouterLink to="/dashboard">Dashboard</RouterLink> |
      <RouterLink to="/add-article">Add Article</RouterLink>
    </nav>
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

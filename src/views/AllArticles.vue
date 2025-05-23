<template>
  <div class="login-page">
    <h1>Login</h1>

    <LoginForm
      :loading="loading"
      :onsubmit="handleLogin"
    />
  </div>
</template>

<script lang="ts" setup>
import LoginForm from '@/components/LoginForm.vue'
import { ref } from 'vue'

const loading = ref(false)

function handleLogin(data: { email: string; password: string }) {
  loading.value = true

  setTimeout(() => {
    console.log('Login submitted:', data)
    loading.value = false
    alert('Logged in successfully!')
  }, 1500)
}
</script>

<style scoped lang="scss">
.login-page {
  padding: 2rem;

  h1 {
    margin-bottom: 1.5rem;
    color: #111827;
  }
}
</style>

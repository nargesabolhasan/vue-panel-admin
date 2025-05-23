<template>
  <div class="login-page">
    <h1>Login</h1>
    <LoginForm :loading="loading" :onsubmit="handleLogin" />
  </div>
</template>
<script lang="ts" setup>
import LoginForm from '@/components/LoginForm.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AUTH_TOKEN, USER_API } from '@/constants/constant.ts'
import { ROUTES } from '@/constants/routes.ts'

import { useUserStore } from '@/stores/user'

const loading = ref(false)
const router = useRouter()
const userStore = useUserStore()

async function handleLogin(data: { email: string; password: string }) {
  loading.value = true

  try {
    const url = `${USER_API}?email=${encodeURIComponent(data.email)}&password=${encodeURIComponent(data.password)}`
    const response = await fetch(url)

    const users = await response.json()

    if (users.length === 0) {
      throw new Error('Invalid credentials')
    }

    const user = users[0]

    // Save user data in Pinia store
    userStore.setUser({
      username: user.username,
      // add other fields if needed
    })
    console.log(userStore.user)
    // Simulate login by storing fake token
    const fakeToken = btoa(`${user.id}:${user.email}`)
    localStorage.setItem(AUTH_TOKEN, fakeToken)

    alert('Logged in successfully!')
    router.push(ROUTES.DASHBOARD.ADD_ARTICLE)
  } catch (err) {
    alert('Invalid login credentials')
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

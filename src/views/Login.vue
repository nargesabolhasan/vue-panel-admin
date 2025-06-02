<template>
  <div class="sign-in-wrapper">
    <h1>Login</h1>
    <LoginForm :loading="loading" :onsubmit="handleLogin" />
    <span>create Account</span>
    <LinkButton :to="ROUTES.SIGN_IN" title="Sign up" />
  </div>
</template>
<script lang="ts" setup>
import LoginForm from '@/components/LoginForm.vue'
import { AUTH_TOKEN, USER_API } from '@/constants/constant.ts'
import { useFetch } from '@/composables/useFetch.ts'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.ts'
import { ROUTES } from '@/constants/routes.ts'
import { showToast } from '@/components/toast/ShowToast.ts'
import LinkButton from '@/components/buttons/LinkButton.vue'

const router = useRouter()
const userStore = useUserStore()
const { loading, run } = useFetch<any>()

async function handleLogin(data: { email: string; password: string }) {
  try {
    const response = await run(
      `${USER_API}?email=${encodeURIComponent(data.email)}&password=${encodeURIComponent(data.password)}`,
    )
    if (!response) {
      console.error('No response received. Check your credentials or server status.')
    }
    if (response.length === 0) {
      throw new Error('Invalid credentials')
    }

    const user = response[0]

    userStore.setUser({
      username: user.username,
    })

    const fakeToken = btoa(`${user.id}:${user.email}`)
    localStorage.setItem(AUTH_TOKEN, fakeToken)
    showToast('success', 'Logged In', 'Welcome back!')
    router.push(ROUTES.DASHBOARD.ADD_ARTICLE)
  } catch (error) {
    showToast('danger', 'Sign-in Failed!', 'username or password is incorrect.')
  }
}
</script>

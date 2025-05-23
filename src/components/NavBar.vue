<template>
  <header class="bg-neutral_bg1 text-neutral_fg1_hover p-4">
    <nav class="flex justify-between text-neutral_fg1_hover">
      <span v-if="userStore.user">Welcome {{ userStore.user.username }}</span>

      <Button title="logout" @click="logout" color="secondary" />
    </nav>
  </header>
</template>

<script lang="ts" setup>
import Button from '@/components/buttons/Button.vue'
import { useAuth } from '@/composables/useAuth.ts'
import { useUserStore } from '@/stores/user.ts'

const userStore = useUserStore()
const { logout } = useAuth()
</script>

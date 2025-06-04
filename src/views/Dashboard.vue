<template>
  <NavBar />
  <div class="flex grow flex-col md:flex-row md:justify-between">
    <Sidebar :menu="menu" class="w-64 hidden md:block" />
    <div class="flex-1 p-4 bg-neutral_bg2_default overflow-y-auto">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '@/components/sidebar/Sidebar.vue'
import { ROUTES } from '@/constants/routes.ts'
import NavBar from '@/components/NavBar.vue'

const menu = [
  { title: 'All Articles', route: ROUTES.DASHBOARD.ALL_ARTICLES },
  { title: 'Add Article', route: ROUTES.DASHBOARD.ADD_ARTICLE },
]
</script>

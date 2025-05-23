<template>
  <NavBar />
  <div class="dashboard-layout">
    <Sidebar :menu="menu" />
    <div class="dashboard-content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '@/components/sidebar/Sidebar.vue'
import { ROUTES } from '@/constants/routes.ts'
import NavBar from '@/components/NavBar.vue'

const menu = [
  { title: 'Add Article', route: ROUTES.DASHBOARD.ADD_ARTICLE },
  { title: 'All Articles', route: ROUTES.DASHBOARD.ALL_ARTICLES },
]
</script>

<style scoped lang="scss">
.dashboard-layout {
  display: flex;
  height: 100vh;
}

.dashboard-content {
  flex: 1;
  padding: 1rem;
  background-color: #f7fafc;
  overflow-y: auto;
}
</style>

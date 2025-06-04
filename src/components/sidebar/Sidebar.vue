<template>
  <!-- Mobile Header -->
  <header class="md:hidden flex items-center justify-between px-4 py-3 bg-neutral_bg1 shadow">
    <h1 class="text-lg font-bold text-neutral_fg1">Dashboard</h1>
    <button @click="toggleMenu" class="text-neutral_fg2 focus:outline-none">
      <svg
        v-if="!menuOpen"
        class="h-6 w-6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <svg
        v-else
        class="h-6 w-6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </header>

  <!-- Mobile Menu -->
  <nav v-if="menuOpen" class="md:hidden bg-neutral_bg1 border-t">
    <ul class="flex flex-col">
      <MenuLink
        v-for="item in menu"
        :key="item.route"
        :item="item"
        wrapper-class="border-b border-neutral_st2_hover"
        link-class="px-4 py-2"
        @click="menuOpen = false"
      />
    </ul>
  </nav>

  <!-- Desktop Sidebar -->
  <aside class="hidden md:block w-64 bg-neutral_bg1">
    <nav>
      <ul>
        <MenuLink
          v-for="item in menu"
          :key="item.route"
          :item="item"
          wrapper-class="nav-item"
          link-class="h-[40px]"
        />
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MenuLink from '@/components/sidebar/MenuLink.vue'

interface MenuItem {
  title: string
  route: string
}

const props = defineProps<{
  menu: MenuItem[]
}>()

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
</script>

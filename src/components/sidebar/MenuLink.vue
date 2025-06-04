<template>
  <li :class="wrapperClass">
    <router-link
      :to="item.route"
      :class="[
        'p-2 text-neutral_fg1_hover hover:bg-neutral_bg1_press block text-center',
        linkClass,
      ]"
      active-class="bg-primary_bg1_hover text-primary_hover"
      @click="$emit('click')"
    >
      {{ item.title }}
    </router-link>
  </li>
</template>

<script lang="ts" setup>
interface MenuItem {
  title: string
  route: string
}

defineProps<{
  item: MenuItem
  wrapperClass?: string
  linkClass?: string
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

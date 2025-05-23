<template>
  <ul class="menu">
    <li
      v-for="item in items"
      :key="item"
      :class="{ active: item === modelValue }"
      @click="$emit('update:modelValue', item)"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineProps<{
  items: string[]
  modelValue: string
}>()

defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
.menu {
  list-style: none;
  padding: 0;

  li {
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-bottom: 1px solid #eee;

    &.active {
      background-color: #4f46e5;
      color: white;
    }

    &:hover {
      background-color: #eef;
    }
  }
}
</style>

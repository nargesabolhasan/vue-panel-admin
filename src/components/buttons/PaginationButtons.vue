<template>
  <button
    :disabled="disabled"
    @click="onClick"
    class="px-3 py-1 w-12 h-12 rounded-lg transition-colors duration-200 flex items-center justify-center"
    :class="[
      selected
        ? 'bg-primary text-neutral_bg1 hover:bg-neutral_bg1_hover hover:text-neutral_fg1'
        : 'bg-neutral_bg1 text-neutral_fg1 hover:bg-neutral_bg1_hover',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
    ]"
  >
    <slot>{{ title }}</slot>
  </button>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  selected: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  onClick: { type: Function, default: () => {} },
})
</script>

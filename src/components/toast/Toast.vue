<template>
  <Transition name="toast-fade">
    <div
      v-if="visible"
      class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full rounded-2xl p-4 shadow-lg text-white animate-slide-in"
      :class="variantClass"
    >
      <span class="font-semibold text-lg mb-1 block">{{ title }}</span>
      <p class="text-sm">{{ body }}</p>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { registerToast } from '@/components/toast/ShowToast.ts'

const visible = ref(false)
const title = ref('')
const body = ref('')
const variant = ref<'success' | 'danger'>('success')

const variantClass = computed(() => {
  return variant.value === 'success'
    ? 'bg-success_bg1 !text-success_fg1'
    : 'bg-error_bg1 !text-error_fg1'
})

onMounted(() => {
  registerToast(({ title: t, body: b, variant: v }) => {
    title.value = t
    body.value = b
    variant.value = v
    visible.value = true
    setTimeout(() => (visible.value = false), 3000)
  })
})
</script>

<style scoped>
@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>

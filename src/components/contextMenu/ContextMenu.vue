<template>
  <div ref="triggerWrapper" class="inline-block relative">
    <!-- Trigger Button -->
    <button
      @click.stop="toggleMenu"
      class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
    >
      <svg
        class="w-5 h-5 text-gray-600"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6h.01M12 12h.01M12 18h.01" />
      </svg>
    </button>

    <!-- Menu rendered outside DOM flow using Teleport -->
    <Teleport to="body">
      <transition name="fade">
        <div
          v-if="isOpen"
          class="absolute z-50 w-36 bg-white border border-gray-200 rounded shadow"
          :style="menuStyles"
        >
          <ul class="py-1">
            <li v-for="(item, index) in items" :key="index">
              <button
                @click="handleAction(item)"
                class="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-gray-700"
              >
                {{ item.title }}
              </button>
            </li>
          </ul>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, reactive, nextTick } from 'vue'

interface MenuItem {
  title: string
  action: () => void
}

const props = defineProps<{ items: MenuItem[] }>()
const isOpen = ref(false)
const triggerWrapper = ref<HTMLElement | null>(null)

const menuStyles = reactive({
  position: 'fixed',
  top: '0px',
  left: '0px',
})

function toggleMenu() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      positionMenu()
    })
  }
}

function handleAction(item: MenuItem) {
  item.action()
  isOpen.value = false
}

function positionMenu() {
  const rect = triggerWrapper.value?.getBoundingClientRect()
  if (rect) {
    menuStyles.top = `${rect.bottom + 4}px`
    menuStyles.left = `${rect.left}px`
  }
}

function handleClickOutside(event: MouseEvent) {
  if (
    isOpen.value &&
    triggerWrapper.value &&
    !triggerWrapper.value.contains(event.target as Node)
  ) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

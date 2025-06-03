<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div class="w-[456px] min-h-[276px] bg-neutral_bg1 rounded-2xl shadow-lg max-w-md space-y-4">
        <div class="flex flex-col items-start space-x-3 px-[24px] py-[16px]">
          <h2 class="text-xl text-neutral_fg1 font-semibold">{{ title }}</h2>
          <p v-if="description" class="!mx-0 text-sm text-neutral_st1_default">
            {{ description }}
          </p>
        </div>
        <div
          class="min-h-[132px] flex flex-col items-center gap-2 border-y border-y-neutral_st3_default px-[24px] py-[16px]"
        >
          <span
            :class="[
              isDanger ? 'bg-error_bg1' : 'bg-success_bg1',
              'flex flex-center text-sm p-6 rounded-full',
            ]"
          >
            <i
              :class="[
                isDanger ? 'icon-error-hint' : 'icon-primary-tick',
                isDanger ? 'error_fg1' : 'text-success_fg1',
              ]"
            />
          </span>
          <p class="text-gray-700">{{ body }}</p>
        </div>
        <div
          :class="[
            'flex gap-4 px-[24px] py-[16px] !mt-0',
            isDanger ? 'flex-row-reverse justify-start' : 'flex-row justify-end',
          ]"
        >
          <Button :title="cancelText" color="secondary" @click="handleCancel" />
          <Button
            :loading="loading"
            :title="confirmText"
            :color="isDanger ? 'danger' : 'primary'"
            @click="handleConfirm"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'
import Button from '@/components/buttons/Button.vue'

const props = defineProps<{
  visible: boolean
  title: string
  description?: string
  body: string
  status: 'danger' | 'primary'
  cancelText: string
  confirmText: string
  loading?: boolean
}>()

const emit = defineEmits(['confirm', 'cancel'])

const isDanger = props.status === 'danger'

function handleCancel() {
  emit('cancel')
}
function handleConfirm() {
  emit('confirm')
}
</script>

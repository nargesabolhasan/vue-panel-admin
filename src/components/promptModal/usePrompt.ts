import { ref, h, render } from 'vue'
import PromptModal from './PromptModal.vue'

interface PromptOptions {
  title: string
  description?: string
  body: string
  status?: 'danger' | 'primary'
  cancelText?: string
  confirmText?: string
  onCancel?: () => void
  onConfirm?: () => void
}

export function usePrompt() {
  const container = document.createElement('div')
  document.body.appendChild(container)

  return function showPrompt(options: PromptOptions) {
    const visible = ref(true)

    const vnode = h(PromptModal as any, {
      visible: visible.value,
      title: options.title,
      description: options.description,
      body: options.body,
      status: options.status ?? 'primary',
      cancelText: options.cancelText ?? 'Cancel',
      confirmText: options.confirmText ?? 'Confirm',
      onCancel: () => {
        visible.value = false
        options.onCancel?.()
        cleanup()
      },
      onConfirm: () => {
        visible.value = false
        options.onConfirm?.()
        cleanup()
      },
    })

    function cleanup() {
      render(null, container)
    }

    render(vnode, container)
  }
}

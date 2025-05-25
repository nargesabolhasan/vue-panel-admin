type ToastPayload = {
  variant: 'success' | 'danger'
  title: string
  body: string
}

let trigger: ((payload: ToastPayload) => void) | null = null

export function registerToast(fn: typeof trigger) {
  trigger = fn
}

export function showToast(variant: 'success' | 'danger', title: string, body: string) {
  if (trigger) {
    trigger({ variant, title, body })
  } else {
    console.warn('Toast system not registered yet.')
  }
}

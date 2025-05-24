import { ref } from 'vue'

interface FetchResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  run: () => Promise<void>
}

export function useFetch<T>(url: string): FetchResult<T> {
  const data = ref<T | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const run = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    run,
  }
}

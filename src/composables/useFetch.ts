import { ref } from 'vue'

interface FetchResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  run: (url: string, options?: RequestInit) => Promise<T | null>
}

export function useFetch<T>(): FetchResult<T> {
  const data = ref<T | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const run = async (url: string, options: RequestInit = {}): Promise<T | null> => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        const json = await response.json()
        data.value = json
        return json
      } else {
        const text = await response.text()
        data.value = text as any
        return text as any
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return null
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

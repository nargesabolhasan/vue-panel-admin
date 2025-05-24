// import type { Ref, UnwrapRef } from 'vue'
// import { ref } from 'vue'
//
// type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
//
// interface HttpState<T> {
//   data: Ref<UnwrapRef<T> | null>
//   loading: Ref<boolean>
//   error: Ref<string | null>
//   execute: (body?: any) => Promise<void>
// }
//
// export function useFetch<T extends unknown = unknown>(
//   url: string,
//   method: HttpMethod = 'GET',
// ): HttpState<T> {
//   const data = ref<UnwrapRef<T> | null>(null)
//   const loading = ref(false)
//   const error = ref<string | null>(null)
//
//   async function execute(body?: any) {
//     loading.value = true
//     error.value = null
//
//     try {
//       const options: RequestInit = {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//
//       if (body !== undefined) {
//         options.body = JSON.stringify(body)
//       }
//
//       const res = await fetch(url, options)
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status} ${res.statusText}`)
//       }
//
//       const result = (await res.json()) as T
//       data.value = result as UnwrapRef<T>
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         error.value = err.message
//       } else {
//         error.value = 'Unknown error occurred'
//       }
//     } finally {
//       loading.value = false
//     }
//   }
//
//   if (method === 'GET') {
//     execute()
//   }
//
//   return {
//     data,
//     loading,
//     error,
//     execute,
//   }
// }

import { ref } from 'vue'

interface FetchResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  run: () => Promise<void> // Function to trigger the fetch
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
    run, // Return the function to trigger the fetch
  }
}

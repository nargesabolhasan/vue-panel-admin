import { useRouter } from 'vue-router'
import { AUTH_TOKEN, STORAGE_KEY } from '@/constants/constant.ts'

export function useAuth() {
  const router = useRouter()

  function logout() {
    localStorage.removeItem(AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEY)
    router.push('/login')
  }

  function isLoggedIn(): boolean {
    return !!localStorage.getItem(AUTH_TOKEN)
  }

  return { logout, isLoggedIn }
}

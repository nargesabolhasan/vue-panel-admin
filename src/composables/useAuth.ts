import { useRouter } from 'vue-router'
import { AUTH_TOKEN, STORAGE_KEY } from '@/constants/constant.ts'
import { ROUTES } from '@/constants/routes.ts'

export function useAuth() {
  const router = useRouter()

  function logout() {
    localStorage.removeItem(AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEY)
    router.push(ROUTES.LOGIN)
  }

  function isLoggedIn(): boolean {
    return !!localStorage.getItem(AUTH_TOKEN)
  }

  return { logout, isLoggedIn }
}

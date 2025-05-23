import { useRouter } from 'vue-router'
import { AUTH_TOKEN } from '@/constants/constant.ts'

export function useAuth() {
  const router = useRouter()

  function logout() {
    localStorage.removeItem(AUTH_TOKEN)
    router.push('/login')
  }

  function isLoggedIn(): boolean {
    return !!localStorage.getItem(AUTH_TOKEN)
  }

  return { logout, isLoggedIn }
}

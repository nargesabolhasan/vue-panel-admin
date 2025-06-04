import { defineStore } from 'pinia'
import { STORAGE_KEY } from '@/constants/constant.ts'

export interface UserData {
  id: number
  username: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as UserData | null,
  }),

  actions: {
    setUser(userData: UserData) {
      this.user = userData
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
    },

    loadUserFromStorage() {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        this.user = JSON.parse(stored)
      }
    },
  },
})

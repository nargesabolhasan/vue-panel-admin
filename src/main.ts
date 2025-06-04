import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useUserStore } from './stores/user'
import '@/assets/styles/main.scss'
import './index.css'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

const userStore = useUserStore()
userStore.loadUserFromStorage()

app.use(router)
app.mount('#app')

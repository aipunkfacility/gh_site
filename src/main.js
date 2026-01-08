import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// --- ИСПРАВЛЕНИЕ 1: Подключение CSS файлов ---
// Перемести папку 'css' в 'src/assets/css' перед запуском!
import './assets/css/variables.css'
import './assets/css/layout.css'
import './assets/css/components.css'
import './assets/css/buttons.css'
import './assets/css/pages.css'
import './assets/css/style.css'

// Подключение основных стилей (Tailwind)
import './assets/styles/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

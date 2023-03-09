import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Components from './components/'
import Router from './router'
import 'uno.css'
import './style.css'

createApp(App).use(createPinia()).use(Components).use(Router).mount('#app')

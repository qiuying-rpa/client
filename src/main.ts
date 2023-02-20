import { createApp } from 'vue'
import App from './App.vue'
import Components from './components/'
import Router from './router'
import 'uno.css'
import './style.css'

createApp(App).use(Components).use(Router).mount('#app')

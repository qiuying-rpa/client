/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import qiuying from './qiuying'
import 'virtual:uno.css'
import '../styles/main.css'
import 'animate.css'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
  loadFonts()
  app
    .use(qiuying)
    .use(vuetify)
    .use(router)
    .use(pinia)
}

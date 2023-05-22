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
import NProgress from 'nprogress'
import 'virtual:uno.css'
import 'animate.css'
import 'nprogress/nprogress.css'
import '../styles/main.css'

NProgress.configure({ showSpinner: false })

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

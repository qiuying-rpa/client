import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    tags?: ('menu' | 'public' | 'no-auth' | 'layout' | 'nav')[]
    icon?: string
    order?: number
    actions?: SimpleItem<string>[]
  }
}
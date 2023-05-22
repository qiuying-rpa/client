/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  defaults: {
    VBtn: {
      size: 'small'
    },
    VList: {
      density: 'compact'
    },
    VTextField: {
      density: 'compact',
      variant: 'outlined'
    },
    VSelect: {
      density: 'compact',
      variant: 'outlined'
    },
    VAutocomplete: {
      density: 'compact',
      variant: 'outlined'
    }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#be185d',
          secondary: '#ec4899',
        },
      },
    },
  },
})

import colors from 'vuetify/es5/util/colors'

const appTitle = 'グルチャ'
export default {
  mode: 'spa',
  srcDir: 'app',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + appTitle,
    title: '登録不要のオープンなグループチャット',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/firebase', '~/plugins/ex-store'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  env: {
    APP_TITLE: appTitle,
    AUTHOR_NAME: process.env.npm_package_author_name || '',
    // Firebase設定
    FIREBASE_API_KEY: 'AIzaSyA9nZbzsGCx1GFyXNr2G0g-s5UdBzm4f4c',
    FIREBASE_AUTH_DOMAIN: 'grucha-1c551.firebaseapp.com',
    FIREBASE_DATABASE_URL: 'https://grucha-1c551.firebaseio.com',
    FIREBASE_PROJECT_ID: 'grucha-1c551',
    FIREBASE_STORAGE_BUCKET: 'grucha-1c551.appspot.com',
    FIREBASE_MESSAGING_SENDER_ID: '771495923261',
    FIREBASE_APP_ID: '1:771495923261:web:873c89b3b4ab7708d72454',
    FIREBASE_MEASUREMENT_ID: 'G-1Y291C14W8'
  },
  build: {
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 }
            }
          ]
        ]
      }
    }
  }
}

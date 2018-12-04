const pkg = require('./package')
const { STRIPE_TOKEN } = process.env;

module.exports = {
  buildDir: './functions/nuxt',
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/stripe', ssr: false },
    { src: '~/plugins/fireauth', ssr: true }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    'nuxt-stripe-module'
  ],
  stripe: {
    version: 'v3',
    publishableKey: 'pk_test_yBVcFyDWFZeqbpVo6fKuLzUf',
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    transpile: [
      '/plugins/stripe',
    ],
    publicPath: '/public/',
    vendor: [],
    extractCSS: true,
    bable: {
      presets: [
        'es2015',
        'stage-8'
      ],
      plugins: [
        ['transform-runtime', {
          'polyfill': true,
          'regenerator': true
        }]
      ]
    },
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    router: {
      middleware: 'router-auth'
    }
  }
}

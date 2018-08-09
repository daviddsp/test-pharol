const axios = require('axios')

module.exports = {
  cache: true,
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://www.pharol.cl/',
    generate: true, // Enable me when using nuxt generate
    routes (callback) {
      axios.get('https://products.pharol.cl/products/all')
      .then(res => {
        let routes = res.data.map(products => 'https://www.pharol.cl/products/' + products.name.toLowerCase().replace(/%/g, '').replace(/ /g, '-').replace(/\//g, '-'))
        callback(null, routes)
      })
      .catch(callback)
    }
  },
  generate: {
    routes: function () {
      return axios.get('https://products.pharol.cl/products/all')
      .then(
        res => {
          res.data.map(products => 'https://www.pharol.cl/products/' + products.name.toLowerCase().replace(/%/g, '').replace(/ /g, '-').replace(/\//g, '-'))
        }
      )
    },
    minify: {
      collapseBooleanAttributes: true,
      collapseWhitespace: false,
      decodeEntities: true,
      minifyCSS: true,
      minifyJS: true,
      processConditionalComments: true,
      removeAttributeQuotes: false,
      removeComments: false,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: false,
      removeStyleLinkTypeAttributes: false,
      removeTagWhitespace: false,
      sortAttributes: true,
      sortClassName: false,
      trimCustomFragments: true,
      useShortDoctype: true
    },
  },
  env: {
    // Produccion
    apiPurchase: 'https://products.pharol.cl',
    apiUser: 'https://users.pharol.cl',
    apiTag: 'https://banners.pharol.cl',

    // Desarollo
    // apiPurchase: process.env.BASE_URL || 'http://localhost:1338',
    // apiUser: process.env.BASE_URL || 'http://localhost:1337',
    // apiTag: process.env.BASE_URL || 'http://localhost:1339',
    imgAws: `https://pharol.s3.amazonaws.com/media/`,
    // facebookClient: '1960641290915466',
    // GoogleClient: '559025716898-a340hi2p8t3rpvp9cjducp8f311c1ild.apps.googleusercontent.com',
  },
  router: {
    middleware: 'auth'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Farmacia Online Pharol',
    htmlAttrs: {
      lang: 'es',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Farmacia Online Pharol - Busca y compra tus remedios o productos de farmacia a precios bajos y recíbelos con despacho a domicilio, sólo en PHAROL, la primera farmacia online de Chile.' },
      { hid: 'robots', name: 'robots', content: 'index, follow'},
      { hid: 'google-site-verification', name: 'google-site-verification', content: 'tUBQbVyvOhNxuWzwAgqu3pS0PMM-bv-Es7wGADN0HeA'}

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
    ],
    //Implementación chatlio
    script: [
        { src: 'https://s3-us-west-2.amazonaws.com/pharol-v2/js/chatlio.js'},
        { src: '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5b0e0b4bc518454b', body: true },
        { src: 'https://apis.google.com/js/api:client.js' },
        { src: 'https://s3-us-west-2.amazonaws.com/pharol-v2/js/active-campaign.js' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  modules: [
   ['@nuxtjs/google-tag-manager', { id: 'GTM-WKHPV9R' }],
   '@nuxtjs/onesignal',
   '@nuxtjs/pwa',
   '@nuxtjs/sitemap',
   'nuxt-robots-module',
   // With options
   ['nuxt-robots-module', {
    /* module options */
    UserAgent: '*',
    Disallow: '',
  }],

  ],


  oneSignal: {
    init: {
      appId: '168ee16a-c46b-4711-a10c-bffde6bff2fc',
      allowLocalhostAsSecureOrigin: false,
      welcomeNotification: {
          disable: true
      }
    },

    // Use CDN
    cdn: true,

    // Use any custom URL
    OneSignalSDK: 'https://cdn.onesignal.com/sdks/OneSignalSDK.js'

  },
  plugins: [
    '~plugins/vuetify',
    '~plugins/autocomplete',
    '~plugins/vue-instantsearch',
    '~plugins/vue-notifyjs',
    '~plugins/loginFacebook',
    '~plugins/loginGoogle',
    { src: '~plugins/localStorage.js', ssr: false },
  ],
  css: [
    '~assets/app.styl',
    '~assets/main.css',
    '~node_modules/vue-notifyjs/themes/default.css',
  ],
  loading: {
    color: '#FF581E',
    duration: 5000,
    height: '5px',
  },
  /**
   * Use lru-cache to allow cached components for better render performances
   * */
  cache: {
    max: 1000,
    maxAge: 900000
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'vuetify'],

    performance: {
      prefetch: true
    },
    //analyze: true,
    gzip :{
      threshold: 0
    },
    maxChunkSize: 300000,

    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }

    
  }
}

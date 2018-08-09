importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "Farmacia-Online-Pharol",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/0.eda2d5b77845519c5c79.js",
    "revision": "cf20093df4073187cf1306983d188a92"
  },
  {
    "url": "/_nuxt/1.15bd92d418ee19645835.js",
    "revision": "895522b9bc25483355e2a12a36685452"
  },
  {
    "url": "/_nuxt/2.f4e45d6c66dbe3522a5c.js",
    "revision": "7cc4424d90a76b99a60a353d71087c84"
  },
  {
    "url": "/_nuxt/42.8303d7d05c62d4b23fa5.js",
    "revision": "546f5f454c10eac6ef71d3311137272a"
  },
  {
    "url": "/_nuxt/43.d5aca9cb9b909044be8e.js",
    "revision": "fd438d75fecddaae13ba66a3b34fb1a7"
  },
  {
    "url": "/_nuxt/44.cee58f5d4aff0744e620.js",
    "revision": "7aeafb5dd0457e504c83cc1f6d44f95c"
  },
  {
    "url": "/_nuxt/45.29b884fdc9dd6f3cd7f8.js",
    "revision": "0d20ccb0d2fef1b170a99c427b65bb5f"
  },
  {
    "url": "/_nuxt/46.6fad5e8e3c9a54e1a8a7.js",
    "revision": "12ed573378583afd3204ee5cbb776d18"
  },
  {
    "url": "/_nuxt/48.fac6166423feba46845d.js",
    "revision": "134957e35e4fd2aa6f24c40371fe7be3"
  },
  {
    "url": "/_nuxt/layouts/default.e4cd5acddb204e25d368.js",
    "revision": "527d307b2ce872c8512c25df42ce6f5a"
  },
  {
    "url": "/_nuxt/manifest.9748fc230bf0677d7e3b.js",
    "revision": "5c9f5cde45b7571c238f4c5c68a91785"
  },
  {
    "url": "/_nuxt/pages/about/index.b00dc09e5d499a433478.js",
    "revision": "4b53b7ebd1fb865a97a2c18118d8798c"
  },
  {
    "url": "/_nuxt/pages/auth/_id.114dcd103aff4fc12a32.js",
    "revision": "fa8345d3945af67f33df65eb6fe10053"
  },
  {
    "url": "/_nuxt/pages/auth/confirm/_id.5e9fbac425cfe14a676a.js",
    "revision": "f6a3092e88f6a1e1f8e785ec23f907ba"
  },
  {
    "url": "/_nuxt/pages/auth/confirm/index.a9e940e391028d9b4adb.js",
    "revision": "d355434dd35a96ce5074a7c51c7f349a"
  },
  {
    "url": "/_nuxt/pages/auth/index.d6ba01ebfaa5e5a88aeb.js",
    "revision": "73399daeaa074a78847921ff255b9530"
  },
  {
    "url": "/_nuxt/pages/auth/profile/index.2fafdf1ead430e10b9a2.js",
    "revision": "31c116fa63a561ab5cecef4fc27a8516"
  },
  {
    "url": "/_nuxt/pages/auth/recover/index.0c161c3a029d4ea54000.js",
    "revision": "5cf34fb44cb03d494496099c06bff385"
  },
  {
    "url": "/_nuxt/pages/auth/recover/password/index.0fd4746485d9f46b76df.js",
    "revision": "390a30fe91c0d8b839c168ccbbbd36ff"
  },
  {
    "url": "/_nuxt/pages/auth/register/index.cfb5afc48ca0a88d0cd2.js",
    "revision": "88842a12d8769570c5f1769bcd88555f"
  },
  {
    "url": "/_nuxt/pages/auth/register/token/index.16eec49980609cd2aa16.js",
    "revision": "d23adce877021ba2f3aa47c24c562029"
  },
  {
    "url": "/_nuxt/pages/auth/update/index.5db7fcf97a9c1b45b43d.js",
    "revision": "244b8534d0e5b09ff728d267aa10f9da"
  },
  {
    "url": "/_nuxt/pages/cart/_id.18e1f570f46c8537c66b.js",
    "revision": "3cd88201905b7c1faa7378b03594565d"
  },
  {
    "url": "/_nuxt/pages/cart/index.c57bf334c4da80d38012.js",
    "revision": "01c2fb7f11cd44c68a9a65a47f59ad05"
  },
  {
    "url": "/_nuxt/pages/category/_id.0b44281b0b5ff31958b5.js",
    "revision": "cea793c26fa70d439184034b6ece04e6"
  },
  {
    "url": "/_nuxt/pages/category/_subCategory/_id.cfba6c138dc557dd37b8.js",
    "revision": "4c9541170d64f51c4e30524181fdfb2e"
  },
  {
    "url": "/_nuxt/pages/category/_subCategory/_subCategory2/_id.b91890ac3ff9e0cfe510.js",
    "revision": "ef7bfcec16aa2e364d44b9b5164ded79"
  },
  {
    "url": "/_nuxt/pages/checkout/index.798921a9171a523b4dea.js",
    "revision": "486fa6bf741bdf6199be3e8c07426773"
  },
  {
    "url": "/_nuxt/pages/checkout/payment/index.58e9789c54cef85a60d9.js",
    "revision": "e804468a7a2297c3c398fa4a5cc05968"
  },
  {
    "url": "/_nuxt/pages/checkout/recipe/index.94ec241dccb1e13c67b2.js",
    "revision": "909fc7064b6c5bdf5a44ec82d8a2f8cb"
  },
  {
    "url": "/_nuxt/pages/checkout/resume/index.7a1075cfc81b80607828.js",
    "revision": "8151a34b608d41bd29439c65624c86d0"
  },
  {
    "url": "/_nuxt/pages/checkout/retirement/index.bfd77adce47f8c696eb8.js",
    "revision": "eba46cc43f5f391a08b0f22517243682"
  },
  {
    "url": "/_nuxt/pages/contact/index.ec71a014ee201ea774ba.js",
    "revision": "afd1363da58478b38b5396df0ffcef72"
  },
  {
    "url": "/_nuxt/pages/how-to-buy/index.052606009452be8aae06.js",
    "revision": "8814a999c366780dd214171479270990"
  },
  {
    "url": "/_nuxt/pages/laboratorio/_id.becf9ef9ee24925f1586.js",
    "revision": "e5b711a4ab806bc4557433e7c3844da4"
  },
  {
    "url": "/_nuxt/pages/laboratorio/index.d17eccd0d9a389d32750.js",
    "revision": "111a190ec9a70b8437f74c5f7b2f35c3"
  },
  {
    "url": "/_nuxt/pages/notification/index.2cf7e7593dac7bf21f72.js",
    "revision": "5380c82f326b3c23ba2285cf90901cce"
  },
  {
    "url": "/_nuxt/pages/offer/_id.e5373572d8c5474dbc6f.js",
    "revision": "d40ca3ba02922416d23039f2b25d9f1a"
  },
  {
    "url": "/_nuxt/pages/offer/index.dd56f3a7a6b972ac316e.js",
    "revision": "dff146e6f2a1f922aa95367e3728fae1"
  },
  {
    "url": "/_nuxt/pages/policies/index.598daac523d68aea84c2.js",
    "revision": "f26f82f7cc506fab76f65658eb9b44bd"
  },
  {
    "url": "/_nuxt/pages/products/_id.7d37e3868014fcbb0019.js",
    "revision": "6fa78741276ba703824da925f38e62fa"
  },
  {
    "url": "/_nuxt/pages/products/index.60abdbadedcb40208a5b.js",
    "revision": "1a07b87a18a07501a9cf5a2129230426"
  },
  {
    "url": "/_nuxt/pages/recent-search/index.79671f69a65688c38269.js",
    "revision": "a066b4a65bdf68687f196b63d0406901"
  },
  {
    "url": "/_nuxt/pages/reminder/index.fdf783ff736f4a8f1cfc.js",
    "revision": "b8fcd181d8beaa241cd39b7a70649538"
  },
  {
    "url": "/_nuxt/pages/results/_id.a3fd55f68b0df86a3abf.js",
    "revision": "80021cc98e883d4ab9b2111258e5d5d9"
  },
  {
    "url": "/_nuxt/pages/service/index.f66177aa6439a6582d13.js",
    "revision": "02fbef215942ae4fe4eebda72792ac2e"
  },
  {
    "url": "/_nuxt/pages/special-offer/index.95521bc7e265a403f588.js",
    "revision": "2410c8960a587aed9b10e95458de9fe0"
  },
  {
    "url": "/_nuxt/pages/terms-conditions/index.aa0f54c73af3ad4bd31e.js",
    "revision": "ed8ce0e2c763a7bd94822eb7460eb9f2"
  },
  {
    "url": "/_nuxt/pages/test/index.5e56002d1fe55d66a41c.js",
    "revision": "cd994c2378f8817c0778cabc6cf9226e"
  },
  {
    "url": "/_nuxt/vendor.9d66db62c6689e5ce882.js",
    "revision": "3369d40c29683ac94f73acd83fb3e342"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')


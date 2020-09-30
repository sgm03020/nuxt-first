// Clientレンダリングの書き方
//import VModal from 'vue-js-modal'
//Vue.use(VModal)

// Serverレンダリングの書き方
// nuxt.config.jsに以下を追加
//plugins: [
//    '~plugins/vue-js-modal.js'
//  ],

import Vue from 'vue'
import VModal from 'vue-js-modal/dist/ssr.nocss'

import 'vue-js-modal/dist/styles.css'

Vue.use(VModal)



import Vue from 'vue'

import Toast from '../toast/index.js'
import Confirm from '../confirm/index.js'

import '../loading/index'

import eDialog from '../dialog/eDialog.vue'

Vue.component("eDialog", eDialog)

Vue.prototype.$toast = Toast
Vue.prototype.$confirm = Confirm
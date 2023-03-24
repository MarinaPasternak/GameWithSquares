import Vue from 'vue'
import App from './App.vue'
import store from './store/game-mode'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import $ from 'jquery'

window.$ = $
window.jQuery = $

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

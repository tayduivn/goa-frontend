import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import Meta from 'vue-meta'
import VueSweetalert2 from 'vue-sweetalert2';
import VueTranslate from 'vue-translate-plugin';
import VueModalTor from 'vue-modaltor'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './assets/styles/index.scss'
import VueStripeCheckout from 'vue-stripe-checkout';

window.$ = window.jQuery = require('jquery')

Vue.use(VueTranslate);

Vue.locales({
  spanish: {
    'hello world': 'hola mundo'
  }
});

Vue.use(VueStripeCheckout, 'pk_test_RYLENHmMBSNMoV4p9LJIOzO700BAT2DyAd');
Vue.config.productionTip = false
Vue.use(Meta)
Vue.use(VueSweetalert2);
Vue.use(VueModalTor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

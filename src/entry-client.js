import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'

const { app, router } = createApp()

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  app.$mount('#app')
})

// service worker
if ('https:' === location.protocol && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}

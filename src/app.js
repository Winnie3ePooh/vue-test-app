import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import titleMixin from './util/title'
import VueResource from 'vue-resource'
// import DatePicker from 'vue2-datepicker'
Vue.prototype.$isServer;
// mixin for handling title
Vue.mixin(titleMixin)
Vue.use(VueResource);
// Vue.component('vue2-datepicker',DatePicker);
// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp () {
  // create store and router instances
  const router = createRouter()

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    render: h => h(App),
    component: {
      App
    }
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router }
}

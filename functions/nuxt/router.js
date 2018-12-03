import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _3509b371 = () => interopDefault(import('../../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _77bfb9f4 = () => interopDefault(import('../../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _8887d836 = () => interopDefault(import('../../pages/privacy/index.vue' /* webpackChunkName: "pages/privacy/index" */))
const _4e6c7570 = () => interopDefault(import('../../pages/sign-up/index.vue' /* webpackChunkName: "pages/sign-up/index" */))
const _0730efa4 = () => interopDefault(import('../../pages/terms/index.vue' /* webpackChunkName: "pages/terms/index" */))
const _1d5fb9f5 = () => interopDefault(import('../../pages/p/_id.vue' /* webpackChunkName: "pages/p/_id" */))
const _ba9f50a8 = () => interopDefault(import('../../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/dashboard",
      component: _3509b371,
      name: "dashboard"
    }, {
      path: "/login",
      component: _77bfb9f4,
      name: "login"
    }, {
      path: "/privacy",
      component: _8887d836,
      name: "privacy"
    }, {
      path: "/sign-up",
      component: _4e6c7570,
      name: "sign-up"
    }, {
      path: "/terms",
      component: _0730efa4,
      name: "terms"
    }, {
      path: "/p/:id?",
      component: _1d5fb9f5,
      name: "p-id"
    }, {
      path: "/",
      component: _ba9f50a8,
      name: "index"
    }],

    fallback: false
  })
}

import Vue from 'vue'

Vue.prototype.$dateTimeToJaDate = (dateTimeString) => {
  if (dateTimeString) {
    const date = new Date(dateTimeString)
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }
  return ''
}


Vue.prototype.$intervals = []
Vue.prototype.$setInterval = (func, intervalMilliSec) => {
  if (typeof process.env.VUE_APP_DISABLE_SET_INTERVAL !== 'undefined') {
    console.log(`[DISABLE_SET_INTERVAL] Check environment vars`)
    return null
  }
  const id = setInterval(() => {
    if (document.visibilityState === 'visible') {
      func()
    }
  }, intervalMilliSec)
  Vue.prototype.$intervals.push(id)
  return id
}
Vue.prototype.$clearInterval = (id) => {
  clearInterval(id)
  Vue.prototype.$intervals = Vue.prototype.$intervals.filter((i) => i !== id)
}
Vue.prototype.$clearAllIntervals = () => {
  Vue.prototype.$intervals.forEach(clearInterval)
  Vue.prototype.$intervals = []
}

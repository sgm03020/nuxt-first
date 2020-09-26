import Vue from 'vue'

Vue.prototype.$myInjectedFunction = (string) =>
  console.log('This is an example', string)

Vue.prototype.$strLength = (string) => {
  let len = 0
  let escapeStr = escape(string)
  for (let i = 0; i < escapeStr.length; i++, len++) {
    if (escapeStr.charAt(i) == '%') {
      if (escapeStr.charAt(++i) == 'u') {
        i += 3
        len++
      }
      i++
    }
  }
  return len
}

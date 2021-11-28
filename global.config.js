'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var pretty_format_1 = __importDefault(require('pretty-format'))
global['prettyFormat'] = pretty_format_1.default
global['sleep'] = function (time) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, time)
  })
}
global['requestAnimationFrame'] = function (fn) {
  return setTimeout(fn)
}
global.document.documentElement.style['grid-column-gap'] = true
;(function () {
  var spy = jest.spyOn(console, 'error')
  beforeAll(function () {
    spy.mockImplementation(function (message) {
      console.log(message)
      throw new Error(message)
    })
  })
  afterAll(function () {
    spy.mockRestore()
  })
})()
//# sourceMappingURL=global.config.js.map

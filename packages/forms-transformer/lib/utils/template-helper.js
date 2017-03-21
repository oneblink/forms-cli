'use strict'

const co = require('co')

const mustache = require('./renderer-mustache.js')
const readContents = require('./read-file-contents.js').readContents

const createRenderer = co.wrap(function * (templatePath) {
  const templateString = yield readContents(templatePath)
  return mustache(templateString)
})

module.exports = {
  createRenderer
}

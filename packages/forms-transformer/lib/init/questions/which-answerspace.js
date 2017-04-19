'use strict'

const url = require('url')

const fetchAnswerspace = require('../../utils/answerspace/fetch-answerspace-id.js')
const readConfig = require('../../config/read-config.js')

let scope

module.exports = {
  name: 'answerspace',
  message: 'What is your answerSpace or EPS url?',
  type: 'input',
  default: () => {
    return readConfig(true).then((cfg) => {
      scope = cfg.scope
      return scope
    }).catch(() => Promise.resolve())
  },
  filter: (input) => {
    if (scope && !/^http/i.test(input)) {
      const uri = new url.URL(input, scope)
      input = uri.href
    }

    return fetchAnswerspace(input).then(() => input)
  }
}
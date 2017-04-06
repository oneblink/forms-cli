'use strict'

const log = require('../lib/logger.js').logger

const askQuestions = require('../lib/init/ask-questions.js')
const updateConfig = require('../lib/config/update-config.js')
const readConfig = require('../lib/config/read-config.js')
const writeTemplates = require('../lib/init/write-templates.js')
const addPlugin = require('../lib/plugin-system/add-plugin.js')

function init (commands, flags) {
  const finish = () => readConfig().then((cfg) => ({formData: {}, options: cfg}))

  if (flags.templates) {
    return readConfig().then((cfg) => writeTemplates(cfg)).then(finish)
  }

  return askQuestions()
    .then(updateConfig)
    .then((cfg) => {
      if (cfg.framework.toLowerCase() === 'custom') {
        return cfg
      }

      // TODO: this will only work once plugins are published
      return addPlugin(cfg.framework).then(() => writeTemplates(cfg))
    })
    .then(finish)
    .catch((err) => {
      if (err && err.message.toLowerCase() === 'cancelled') {
        log.debug('User cancelled operation')
        return Promise.resolve(finish())
      }

      // make sure the error message gets up to the top level promise#catch
      return Promise.reject(err)
    })
}

module.exports = init
